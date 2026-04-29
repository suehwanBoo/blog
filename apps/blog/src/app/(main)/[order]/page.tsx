import MainPage from "@/feature/main";
import type { OrderValue } from "@/feature/post/constants";

export default async function HomePage({
  params,
}: {
  params: Promise<{ order: OrderValue }>;
}) {
  const order = (await params).order;
  return <MainPage initialOrderValue={order} />;
}
