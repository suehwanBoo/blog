import type { FocusEvent } from "react";
import { preventMobileAction } from "./input.css";

export function iosFocusHandler(e: FocusEvent<HTMLInputElement>) {
  e.currentTarget.classList.add(preventMobileAction);
}

export function iosBlurHandler(e: FocusEvent<HTMLInputElement>) {
  e.currentTarget.classList.remove(preventMobileAction);
}
