# FE-Boo

> 글 작성에 필요한 관리자 도구와 독자용 블로그를 하나의 모노레포에서 개발하는 개인 기술 블로그 프로젝트입니다.

`FE-Boo`는 콘텐츠를 작성하는 경험과 읽는 경험을 분리해 설계했습니다. 관리자는 React 기반의 전용 편집기에서 글과 이미지를 작성하고, 독자는 Next.js 기반의 공개 블로그에서 정적으로 생성된 페이지를 빠르게 탐색할 수 있습니다. 공통 UI, 에디터 뷰어, 인증, 폰트는 독립 패키지로 관리합니다.

> 현재 개발 중인 프로젝트입니다. 편집기와 업로드 파이프라인, 공개 화면 UI는 구현되어 있으며 게시글 영속화와 실제 데이터 연동은 진행 중입니다.

## 주요 기능

### 공개 블로그

- Next.js App Router와 `generateStaticParams`를 이용한 정렬·태그별 페이지 사전 생성
- 쿼리 문자열 기반 URL을 내부 정적 경로로 변환하는 Proxy 라우팅
- 반응형 게시글 목록, 태그 필터, 검색 오버레이, 게시글 상세 UI
- 시스템 설정을 고려한 라이트·다크 테마와 초기 화면 깜빡임 방지
- Firebase 기반 Google·GitHub 로그인 상태 관리
- 재사용 가능한 Overlay, Toast, Tooltip 등 공통 UI 적용

### 관리자 편집기

- Firebase 인증 상태에 따른 편집기 접근 제어
- Tiptap 기반 리치 텍스트 편집기
- 제목, 문단, 정렬, 강조, 목록, 인용문, 구분선, 코드 블록 지원
- TypeScript, JavaScript, CSS, HTML 코드 구문 강조
- 허용된 외부 URL의 Open Graph 메타데이터를 불러오는 링크 카드
- React Hook Form과 Zod를 이용한 단계별 게시글 검증
- 브라우저 Canvas 기반 이미지 WebP 변환 및 리사이징
- 하나의 원본에서 4개 크기의 반응형 썸네일을 생성하고 병렬 업로드

### 이미지 업로드 보안

1. 관리자 앱에서 이미지를 검증하고 WebP로 변환합니다.
2. Firebase ID 토큰과 파일 메타데이터를 블로그 API에 전달합니다.
3. 서버는 토큰, MIME 타입, 파일 크기를 검증한 뒤 30초 유효한 S3 presigned URL을 발급합니다.
4. 브라우저가 S3에 이미지를 직접 업로드하여 애플리케이션 서버의 전송 부하를 줄입니다.

## 아키텍처

```mermaid
flowchart LR
  Reader[독자] --> Blog[Next.js 블로그]
  Author[작성자] --> Admin[React 관리자]

  Admin --> Auth[Firebase Auth]
  Blog --> Auth
  Admin -->|ID 토큰| API[Next.js Route Handler]
  API -->|토큰 검증| FirebaseAdmin[Firebase Admin]
  API -->|presigned URL 발급| S3[AWS S3]
  Admin -->|이미지 직접 업로드| S3

  Blog --> UI[@boo/ui]
  Admin --> UI
  Blog --> Editor[@boo/editor]
  Admin --> Editor
  Blog --> Shared[@boo/firebase · hooks · font]
  Admin --> Shared
```

### 모노레포 구성

| 경로                | 역할                                       | 실행 환경                               |
| ------------------- | ------------------------------------------ | --------------------------------------- |
| `apps/blog`         | 독자용 블로그와 서버 API                   | Next.js, React Server/Client Components |
| `apps/admin`        | 인증된 작성자용 콘텐츠 편집기              | React SPA, Vite                         |
| `packages/ui`       | 디자인 토큰과 공통 컴포넌트, Overlay·Toast | React, Vanilla Extract                  |
| `packages/editor`   | 편집기와 뷰어가 공유하는 콘텐츠 UI         | React, Tiptap 연동                      |
| `packages/firebase` | Firebase 초기화와 인증 API 추상화          | Firebase SDK                            |
| `packages/hooks`    | 앱 간 공통 React Hook                      | React                                   |
| `packages/font`     | Pretendard 서브셋과 폰트 설정              | Vanilla Extract                         |

```text
.
├─ apps
│  ├─ blog                 # 공개 블로그 및 BFF API
│  └─ admin                # 글 작성용 SPA
├─ packages
│  ├─ ui                   # 공통 디자인 시스템
│  ├─ editor               # 에디터·뷰어 공통 요소
│  ├─ firebase             # 인증 초기화와 어댑터
│  ├─ hooks                # 공통 Hook
│  └─ font                 # 공통 웹 폰트
├─ .storybook              # UI 문서화 환경
├─ .github/workflows       # 빌드·배포 자동화
└─ turbo.json              # 작업 파이프라인
```

## 기술적 의사결정

### 공개 화면과 관리 화면 분리

검색 노출과 초기 응답이 중요한 공개 블로그에는 Next.js의 정적 생성을 적용하고, 브라우저 API와 편집 상호작용이 중심인 관리자에는 Vite 기반 React SPA를 적용했습니다. 앱의 배포와 런타임은 분리하면서 공통 코드는 workspace 패키지로 공유합니다.

### 정적 페이지와 사용자 친화적 URL의 공존

정렬 및 태그 조합을 빌드 시점에 생성하고, `/post?tag=React&order=recent` 형태의 요청은 Next.js Proxy에서 검증한 뒤 내부 정적 경로로 rewrite합니다. 잘못된 값은 기본 경로로 돌려보내며, 탐색 상태를 URL로 유지하면서 정적 생성의 이점을 활용합니다.

### 타입 안전한 콘텐츠 작성 흐름

편집 본문은 Tiptap JSON으로 관리하고 메타데이터는 React Hook Form이 담당합니다. Zod 스키마로 제목, 본문, 요약, 태그, 썸네일을 제출 단계마다 검증해 편집기 상태와 서버로 전달할 데이터의 경계를 명확히 했습니다.

### 재사용 가능한 UI 기반

Vanilla Extract의 Theme Contract로 색상, 간격, 반경, 그림자, 모션, z-index를 토큰화했습니다. 공통 컴포넌트는 Storybook에서 라이트·다크 테마와 접근성 검사를 함께 확인하며, Vitest와 Testing Library로 사용자 상호작용을 검증합니다.

### 서버 API 방어

- Firebase Admin SDK로 요청의 Bearer 토큰 검증
- 허용된 관리자 Origin만 CORS 응답에 반영
- 업로드 형식을 JPEG, PNG, WebP로 제한하고 최대 크기를 5MB로 제한
- Open Graph 대상은 HTTPS와 명시적 호스트 allowlist로 제한

## 기술 스택

| 영역          | 기술                                               |
| ------------- | -------------------------------------------------- |
| 모노레포      | Turborepo, pnpm workspace                          |
| 공개 앱       | Next.js 16, React 19                               |
| 관리자 앱     | React 19, Vite 8, React Router 7                   |
| 언어          | TypeScript                                         |
| 스타일        | Vanilla Extract, Recipes                           |
| 상태 관리     | Zustand, Context API, `useSyncExternalStore`       |
| 폼·검증       | React Hook Form, Zod                               |
| 에디터        | Tiptap, Lowlight, Highlight.js                     |
| 인증·데이터   | Firebase Auth, Firebase Admin, Firestore 연동 예정 |
| 스토리지      | AWS S3 presigned URL                               |
| 테스트·문서화 | Vitest, Testing Library, Storybook                 |
| 배포          | Docker, GitHub Actions, GHCR, AWS CloudFront       |

## 시작하기

### 요구 사항

- Node.js 20 이상
- pnpm 9.12.3
- Firebase 프로젝트
- 이미지 업로드를 사용할 경우 AWS S3 버킷

### 설치

```bash
pnpm install
```

### 환경 변수

`apps/blog/.env.local`

```dotenv
# Firebase Client
NEXT_PUBLIC_APIKEY=
NEXT_PUBLIC_AUTHDOMAIN=
NEXT_PUBLIC_PROJECTID=
NEXT_PUBLIC_STORAGEBUCKET=
NEXT_PUBLIC_MESSAGINGSENDERID=
NEXT_PUBLIC_APPID=
NEXT_PUBLIC_MEASUREMENTID=

# Firebase Admin
ADMIN_FIREBASE_PROJECT_ID=
ADMIN_FIREBASE_CLIENT_EMAIL=
ADMIN_FIREBASE_PRIVATE_KEY=

# S3
AWS_REGION=
S3_IMAGE_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
PUBLIC_ASSET_ORIGIN=

# 관리자 앱 Origin
ADMIN_ORIGIN=
```

`apps/admin/.env.local`

```dotenv
# Firebase Client
VITE_APIKEY=
VITE_AUTHDOMAIN=
VITE_PROJECTID=
VITE_STORAGEBUCKET=
VITE_MESSAGINGSENDERID=
VITE_APPID=
VITE_MEASUREMENTID=

# 블로그 앱의 Route Handler
VITE_PRESIGNED_ENDPOINT=
VITE_OPEN_GRAPH_ENDPOINT=
```

`ADMIN_FIREBASE_PRIVATE_KEY`는 배포 환경에 따라 개행 문자를 `\n`으로 전달해야 합니다. 실제 비밀 값은 저장소에 커밋하지 않습니다.

### 개발 서버

공개 블로그와 관리자 앱을 각각 실행합니다.

```bash
# http://localhost:3000
pnpm dev:blog

# http://localhost:5173
pnpm dev:admin
```

### 품질 확인

```bash
# 전체 패키지 테스트
pnpm test

# 전체 빌드
pnpm build

# 공통 UI Storybook: http://localhost:6006
pnpm storybook
```

## 테스트와 배포

- 공통 UI의 입력, 버튼, 탭, 페이지네이션, Tooltip을 컴포넌트 테스트로 검증합니다.
- 전역 Overlay와 Toast의 생명주기 및 상호작용을 테스트합니다.
- `main` 브랜치 push 시 GitHub Actions가 의존성 설치와 전체 빌드를 수행합니다.
- Next.js standalone 결과물을 Docker 이미지로 빌드해 GHCR에 게시합니다.
- self-hosted runner에서 blue-green 배포한 뒤 CloudFront 캐시를 무효화합니다.

## 개발 현황

### 구현 완료

- [x] Turborepo 기반 앱·패키지 구조
- [x] 공개 블로그 반응형 UI와 테마
- [x] 태그·정렬 경로 사전 생성 및 Proxy 라우팅
- [x] Firebase 소셜 로그인 기반 인증 상태 관리
- [x] Tiptap 리치 텍스트 편집기와 코드 구문 강조
- [x] 게시글 메타데이터 검증과 단계별 입력 UI
- [x] 이미지 압축, 반응형 썸네일 생성, S3 직접 업로드
- [x] 공통 UI 패키지, Storybook, 컴포넌트 테스트
- [x] Docker 이미지 빌드 및 배포 자동화

### 진행 중

- [ ] Firestore 게시글 저장·조회 연동
- [ ] 공개 목록과 상세 페이지의 실제 데이터 연결
- [ ] 검색, 댓글, 좋아요, 구독 기능의 백엔드 연동
- [ ] 관리자 권한 모델 세분화
- [ ] 앱 단위 통합 테스트와 사용자 흐름 테스트 확대

## 저장소

- GitHub: [suehwanBoo/blog](https://github.com/suehwanBoo/blog)
