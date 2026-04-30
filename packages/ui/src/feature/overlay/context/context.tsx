import { createContext } from "react";
import type { OverlayController } from "../types";

export const OverlayContext = createContext<OverlayController | null>(null);
