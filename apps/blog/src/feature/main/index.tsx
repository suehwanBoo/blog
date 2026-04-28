import PopularPost from "./ui/PopularPost";
import RecentPost from "./ui/RecentPost";
import SimpleAbout from "./ui/SimpleAbout";
import SimplePost from "./ui/SimplePost";

export default function MainPage() {
  return (
    <>
      <RecentPost />
      <PopularPost />
      <SimplePost />
      <SimpleAbout />
    </>
  );
}
