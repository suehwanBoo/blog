import type { ValueOf } from "@/types";
import GoogleIcon from "./ui/GoogleIcon";
import GithubIcon from "./ui/GithubIcon";

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
