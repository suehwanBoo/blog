"use client";
import { useEffect, useRef, useState, type PropsWithChildren } from "react";
// import { headerRecipe } from "./Header.css";
import { themeVars } from "@boo/ui";
import { headerRecipe } from "./Header.css";

const ON_THE_TOP = 100;
const THRESHOLD = 10;

export default function Header({ children }: PropsWithChildren) {
  console.log(themeVars.color.active);
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < ON_THE_TOP) {
        setShow(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const diff = currentScrollY - lastScrollY.current;

      if (Math.abs(diff) < THRESHOLD) return;

      setShow(diff < 0);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <header className={headerRecipe({ show })}>{children}</header>;
}
