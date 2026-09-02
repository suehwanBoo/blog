import { useEffect, useState } from "react";

export function useIntersectionObserver({
  callback,
  options,
}: {
  callback: () => void;
  options?: IntersectionObserverInit;
}) {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        callback();
      }
    }, options);

    observer.observe(target);

    return () => observer.disconnect();
  }, [target, callback, options]);

  return {
    ref: setTarget,
  };
}
