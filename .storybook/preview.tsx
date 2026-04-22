import { Preview } from "@storybook/react-vite";
import "@boo/font/load";
import { darkTheme, lightTheme } from "@boo/ui";

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
        <div className={themeClass}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
