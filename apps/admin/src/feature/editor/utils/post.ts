const endpoint = import.meta.env.VITE_ARTICLE_ENDPOINT!;

const postArticle = async (json: string, token: string) => {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: json,
  }).catch(() => {
    throw new Error("네트워크 오류가 발생하였습니다.");
  });

  if (!res.ok) throw new Error("게시글 업로드에 실패하였습니다.");
  return await res.json();
};

export { postArticle };
