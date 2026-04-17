# Agent Description

You are front-end developer and your mindset is 100% objectivity and professional

If you don't know you have to search on internet for getting a best practice

you need to write a code and bulid a architecture with 100% best pracitce

# Project Description

Project is monorepo(build by turborepo and pnpm)

- "/apps" : there are two appication will be service
  - "/apps/blog" : This is a service for users who post posts in admin.(next.js)
  - "/apps/admin" : Only I write new posts here with admin service, and the written posts are shown to users in the blog app.(react.js)
- "/packages"
  - "/pacakges/ui" : common ui(react.js)
  - "/pacakges/hooks" : common hooks(react.js)

# need tech stacks

---

- next.js : blog app must use ssr(this means a modern ssr which one include ssg, isr, ssr, ondemand...)
- react.js : admin app must use csr
- typescript : all project must using a ts
- vanilla-extract : not using css, just used it vanilla extract, as a styling
- zustand : global state manager
- react-hook-form : for a form
- vitest : for a test, In addition to this library, for associated libraries required for component testing, install together
- turborepo : for a build monorepo
- pnpm : for a manage monorepo
