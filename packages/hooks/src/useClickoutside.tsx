import { useEffect, useRef } from "react";

export const useClickOutside = <T extends HTMLElement>(
  callback: () => void,
  options?: {
    ignoreSelector?: string;
  },
) => {
  const ref = useRef<T | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node | null;
      if (!ref.current || !target) return;

      if (ref.current.contains(target)) return;

      if (options?.ignoreSelector) {
        const ignoreElements = document.querySelectorAll(
          options.ignoreSelector,
        );

        for (const el of ignoreElements) {
          if (el.contains(target)) return;
        }
      }

      callbackRef.current();
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [options?.ignoreSelector]);

  return ref;
};
