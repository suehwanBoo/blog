import { useContext } from "react";
import { TiptapContext } from "../context/context";

export default function useTiptap() {
  const ctx = useContext(TiptapContext);
  if (!ctx) throw new Error("hook must used in Provider");
  return ctx.editor;
}
