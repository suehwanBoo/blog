import type { Meta, StoryObj } from "@storybook/react-vite";
import Input from "./Input";
import { themeVars } from "../../theme/theme.css";

const meta = {
  title: "Components/Input/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    "aria-label": "Input field",
    placeholder: "Enter text",
    type: "text",
    disabled: false,
  },
  render: (args) => (
    <div style={{ padding: "100px", background: themeVars.color.background }}>
      <Input {...args} />{" "}
    </div>
  ),
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};
