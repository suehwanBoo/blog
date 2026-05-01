import { createContext } from "react";
import type { ToastController } from "../types";

export const ToastContext = createContext<ToastController | null>(null);
