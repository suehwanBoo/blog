import type { OrderValue } from "../post/constants";
import PopularPost from "./ui/PopularPost";
import RecentPost from "./ui/RecentPost";
import SimpleAbout from "./ui/SimpleAbout";
import SimplePost from "./ui/SimplePost";

export default function MainPage({
  initialOrderValue,
}: {
  initialOrderValue: OrderValue;
}) {
  return (
    <>
      <RecentPost />
      <PopularPost />
      <SimplePost initialOrderValue={initialOrderValue} />
      <SimpleAbout />
    </>
  );
}
