import MainPage from "@/feature/main";
import { ORDERS, type OrderValue } from "@/feature/post/constants";
import { isValidOrderValue } from "@/feature/post/utils/parseOrder";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams(): { order: OrderValue }[] {
  return ORDERS.map(({ value }) => ({ order: value }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ order: OrderValue }>;
}) {
  const order = (await params).order;
  if (!isValidOrderValue(order)) notFound();

  return <MainPage initialOrderValue={order} />;
}
