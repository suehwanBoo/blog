import type { ReactNode } from "react";

export type OverlayRender = (controls: { close: () => void }) => ReactNode;

export type OverlayId = string;

export type OverlayController = {
  open: (render: OverlayRender, options?: OverlayOptions) => OverlayId;
  close: (id: OverlayId) => void;
  closeAll: () => void;
};

export type OverlayItem = {
  id: OverlayId;
  render: () => ReactNode;
  options: Required<OverlayOptions>;
};
export type OverlayOptions = {
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
};
