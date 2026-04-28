import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const homeLayout = style({
  margin: "0 auto",
  maxWidth: 1024,
  width: "100%",
  padding: "30px 16px 0 16px",
  display: "grid",
  gridTemplateColumns: `repeat(12, 1fr)`,
  columnGap: 16,
  rowGap: 32,
});

export const gridItem = recipe({
  base: {
    gridColumn: "1 / -1",
    minWidth: 0,
  },
  variants: {
    desktop: {
      3: { "@media": { "(min-width: 768px)": { gridColumn: "span 3" } } },
      4: { "@media": { "(min-width: 768px)": { gridColumn: "span 4" } } },
      5: { "@media": { "(min-width: 768px)": { gridColumn: "span 5" } } },
      6: { "@media": { "(min-width: 768px)": { gridColumn: "span 6" } } },
      7: { "@media": { "(min-width: 768px)": { gridColumn: "span 7" } } },
      8: { "@media": { "(min-width: 768px)": { gridColumn: "span 8" } } },
      12: { "@media": { "(min-width: 768px)": { gridColumn: "span 12" } } },
    },
  },
});
