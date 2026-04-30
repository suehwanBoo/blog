"use client";

import { useMemo, type PropsWithChildren } from "react";
import { OverlayContext } from "./context";
import type { OverlayController } from "../types";
import { overlayStore } from "../store/overlay";
import ModalController from "../components/ModalController";

export default function OverlayProvider({ children }: PropsWithChildren) {
  const controller = useMemo<OverlayController>(
    () => ({
      open: overlayStore.open,
      close: overlayStore.close,
      closeAll: overlayStore.closeAll,
    }),
    [],
  );
  return (
    <OverlayContext.Provider value={controller}>
      {children}
      <ModalController />
    </OverlayContext.Provider>
  );
}
