import { ThemeProvider } from "@/context/theme-context";
import Test from "./Test";

export default async function Home() {
  return (
    <div>
      Blog
      <ThemeProvider>
        <Test />
      </ThemeProvider>
    </div>
  );
}
