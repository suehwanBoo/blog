"use client";

import SimpleAbout from "@/feature/main/ui/SimpleAbout";
import SimplePost from "@/feature/main/ui/SimplePost";
import TagSelector from "./ui/TagSelector";
import type { ProxyPostType } from "./constants";
import useClientSelectedTag from "./hooks/useClientSelectedTag";

export default function PostPage({
  postParams,
}: {
  postParams: ProxyPostType;
}) {
  const [initTag, orderState] = postParams;
  const { tagState, setSelectedTag } = useClientSelectedTag(initTag);

  return (
    <>
      <TagSelector selectedTag={tagState} setSelectedTag={setSelectedTag} />
      <SimplePost
        initialOrderValue={orderState}
        tag={tagState}
        mode="infinite"
      />
      <SimpleAbout />
    </>
  );
}
