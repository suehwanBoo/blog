import { Preview } from "@storybook/react-vite";
import "@boo/font/load";
import { darkTheme, lightTheme } from "@boo/ui";
import { useEffect, type PropsWithChildren } from "react";
import "./reset.css";

function ThemeDecorator({
  children,
  themeClass,
}: PropsWithChildren<{ themeClass: string }>) {
  useEffect(() => {
    document.body.classList.remove(lightTheme, darkTheme);
    document.body.classList.add(themeClass);

    return () => {
      document.body.classList.remove(themeClass);
    };
  }, [themeClass]);

  return <div className={themeClass}>{children}</div>;
}

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for all stories",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },

  decorators: [
    (Story, context) => {
      const themeClass =
        context.globals.theme === "dark" ? darkTheme : lightTheme;
      return (
        <ThemeDecorator themeClass={themeClass}>
          <Story />
        </ThemeDecorator>
      );
    },
  ],
};

export default preview;
