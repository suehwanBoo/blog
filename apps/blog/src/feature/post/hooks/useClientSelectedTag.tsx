"use client";

import { DEFAULT_TAG, TAG_QUERY_KEY, type Tag } from "../constants";
import { useCallback, useState } from "react";
import setClientSearchParams from "@/utils/searchParam/setClientSearchParams";

export default function useClientSelectedTag(initialTag: Tag) {
  const [tagState, setTagState] = useState(initialTag);
  const setSelectedTag = useCallback((value: Tag) => {
    setTagState(value);
    return setClientSearchParams(
      TAG_QUERY_KEY,
      value === DEFAULT_TAG ? null : value,
    );
  }, []);

  return {
    tagState,
    setSelectedTag,
  };
}
