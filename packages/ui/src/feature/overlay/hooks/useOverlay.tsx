"use client";

import { useContext } from "react";
import { OverlayContext } from "../context/context";

export default function useOverlay() {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error("useOverlay must used in OverlayProvider");
  return ctx;
}
