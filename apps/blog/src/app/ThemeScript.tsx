import { THEME_KEY } from "@/constant";
import { darkTheme, lightTheme } from "@boo/theme";

const script = `
(function () {
  try {
    var DARK = 'dark';
    var LIGHT = 'light';

    var stored = localStorage.getItem(${THEME_KEY});
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === DARK || stored === LIGHT
      ? stored
      : (systemDark ? DARK : LIGHT);

    var root = document.documentElement;

    root.classList.remove('${lightTheme}', '${darkTheme}');
    root.classList.add(theme === DARK ? '${darkTheme}' : '${lightTheme}');

    root.dataset.theme = theme;
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
