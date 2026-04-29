import SimpleAbout from "@/feature/main/ui/SimpleAbout";
import SimplePost from "@/feature/main/ui/SimplePost";
import TagSelector from "./ui/TagSelector";
import type { ProxyPostType } from "./constants";

export default async function PostPage({
  postParams,
}: {
  postParams: ProxyPostType;
}) {
  const [tagState, orderState] = postParams;
  return (
    <>
      <TagSelector initialTagState={tagState} />
      <SimplePost initialOrderValue={orderState} />
      <SimpleAbout />
    </>
  );
}
