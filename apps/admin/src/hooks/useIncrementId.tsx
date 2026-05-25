import { useMemo, useRef } from "react";

export default function useIncrementId() {
  const ref = useRef(0);

  return useMemo(
    () => ({
      get current() {
        return ref.current++;
      },
    }),
    [],
  );
}
