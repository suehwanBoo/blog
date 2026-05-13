import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastProvider } from "@boo/ui/client";
import "@boo/ui/styles.css";
import "@boo/editor/styles.css";
import Login from "./feature/user/ui/Login";
import { ThemeProvider } from "./feature/theme/provider";
import Editor from "./feature/editor/Editor";
import AuthProvider from "./feature/user/AuthProvider";
import "@boo/font/load";
import "./init.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Login />} />
              <Route path="/editor" element={<Editor />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
);
