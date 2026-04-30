// store/overlay.ts
import type {
  OverlayId,
  OverlayItem,
  OverlayOptions,
  OverlayRender,
} from "../types";

type Listener = () => void;

let overlays = new Map<OverlayId, OverlayItem>();
const listeners = new Set<Listener>();

const defaultOptions: Required<OverlayOptions> = {
  closeOnBackdrop: true,
  closeOnEsc: true,
};

function emit() {
  listeners.forEach((listener) => listener());
}

export const overlayStore = {
  getSnapShot() {
    return overlays;
  },

  getServerSnapshot() {
    return new Map<OverlayId, OverlayItem>();
  },

  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  open(render: OverlayRender, options?: OverlayOptions): OverlayId {
    const id = crypto.randomUUID();
    const close = () => overlayStore.close(id);

    overlays = new Map(overlays);
    overlays.set(id, {
      id,
      render: () => render({ close }),
      options: {
        ...defaultOptions,
        ...options,
      },
    });

    emit();

    return id;
  },

  close(id: OverlayId) {
    if (!overlays.has(id)) return;

    overlays = new Map(overlays);
    overlays.delete(id);

    emit();
  },

  closeAll() {
    if (overlays.size === 0) return;

    overlays = new Map();
    emit();
  },
};
