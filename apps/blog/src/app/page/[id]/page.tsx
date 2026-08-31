import PageTitle from "@/feature/page/ui/PageTitle";
import { pageStyles as styles } from "./page.css";
import PageContent from "@/feature/page/ui/PageContent";
import PageMeta from "@/feature/page/ui/PageMeta";
import PageComment from "@/feature/page/ui/PageComment";
import SimplePost from "@/feature/main/ui/SimplePost";
import { getArticle } from "@/feature/page/api/server";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  // prevent dynamic rendering (and get runtime parameter)
  return [];
}

const revalidateCache = 86400;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticle(id, revalidateCache);
  if (!article) notFound();

  return (
    <section className={styles.wrapper}>
      <PageTitle
        title={article.title}
        createdAt={article.createdAt}
        likeCount={article.likeCount}
        commentCount={article.commentCount}
      />
      <PageContent content={article.content} thumbnail={article.thumbnail} />
      <PageMeta tags={article.tags} />
      <PageComment />
      <SimplePost initialOrderValue="recent" />
    </section>
  );
}
