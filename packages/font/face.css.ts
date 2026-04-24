import { globalFontFace } from "@vanilla-extract/css";
import pretendardRegular from "./assets/Pretendard-Regular.subset.woff2";
import pretendardBold from "./assets/Pretendard-Bold.subset.woff2";

globalFontFace("Pretendard", {
  src: `url(${pretendardRegular}) format("woff2")`,
  fontWeight: "400",
  fontStyle: "normal",
  fontDisplay: "swap",
});

globalFontFace("Pretendard", {
  src: `url(${pretendardBold}) format("woff2")`,
  fontWeight: "700",
  fontStyle: "normal",
  fontDisplay: "swap",
});
