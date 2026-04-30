import type { ValueOf } from "@/types";
import GithubIcon from "./components/ui/GithubIcon";
import GoogleIcon from "./components/ui/GoogleIcon";

export const AUTH_GROUP = {
  google: {
    icon: GoogleIcon,
    label: "Google",
  },
  github: {
    icon: GithubIcon,
    label: "Github",
  },
} as const;

export type AuthGroup = ValueOf<typeof AUTH_GROUP>;
