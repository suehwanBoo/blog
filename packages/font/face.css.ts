import { globalFontFace } from "@vanilla-extract/css";

import pretendardWoff2 from "./assets/PretendardVariable.woff2";

globalFontFace("Pretendard Variable", {
  src: `url(${pretendardWoff2}) format("woff2-variations")`,
  fontWeight: "100 900",
  fontStyle: "normal",
  fontDisplay: "swap",
});
