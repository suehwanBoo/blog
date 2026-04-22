import { styleVariants } from "@vanilla-extract/css";
import { pretendardFamily } from ".";

export const typography = styleVariants({
  h1: {
    fontFamily: pretendardFamily,
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "140%",
  },
  h2b: {
    fontFamily: pretendardFamily,
    fontWeight: 700,
    fontSize: "20px",
    lineHeight: "140%",
  },
  h2r: {
    fontFamily: pretendardFamily,
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "140%",
  },
  sub1b: {
    fontFamily: pretendardFamily,
    fontWeight: 700,
    fontSize: "18px",
    lineHeight: "140%",
  },
  sub1r: {
    fontFamily: pretendardFamily,
    fontWeight: 400,
    fontSize: "18px",
    lineHeight: "140%",
  },
  sub2b: {
    fontFamily: pretendardFamily,
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "140%",
  },
  sub2r: {
    fontFamily: pretendardFamily,
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "140%",
  },
  body1b: {
    fontFamily: pretendardFamily,
    fontWeight: 700,
    fontSize: "15px",
    lineHeight: "140%",
  },
  body1r: {
    fontFamily: pretendardFamily,
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "140%",
  },
  body2b: {
    fontFamily: pretendardFamily,
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "140%",
  },
  body2r: {
    fontFamily: pretendardFamily,
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "140%",
  },
  cap1b: {
    fontFamily: pretendardFamily,
    fontWeight: 700,
    fontSize: "12px",
    lineHeight: "130%",
  },
  cap1r: {
    fontFamily: pretendardFamily,
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "130%",
  },
  cap2b: {
    fontFamily: pretendardFamily,
    fontWeight: 700,
    fontSize: "11px",
    lineHeight: "130%",
  },
  cap2r: {
    fontFamily: pretendardFamily,
    fontWeight: 400,
    fontSize: "11px",
    lineHeight: "130%",
  },
});
