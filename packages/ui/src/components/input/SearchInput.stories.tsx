import type { Meta, StoryObj } from "@storybook/react-vite";
import SearchInput from "./SearchInput";
import { themeVars } from "../../theme/theme.css";

const meta = {
  title: "Components/Input/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  args: {
    placeholder: "Search posts",
    size: "large",
  },
  render: (args) => (
    <div
      style={{
        padding: "50px",
        background: themeVars.color.background,
        position: "relative",
      }}
    >
      <SearchInput {...args} />
    </div>
  ),
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: {
    size: "large",
    placeholder: "Search articles",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    placeholder: "Search articles",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled search",
  },
};
