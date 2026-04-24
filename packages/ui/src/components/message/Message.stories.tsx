import type { Meta, StoryObj } from "@storybook/react-vite";
import Message from "./Message";
import { themeVars } from "../../theme/theme.css";

const meta = {
  title: "Components/Message/Message",
  component: Message,
  tags: ["autodocs"],
  args: {
    title: "Message title",
    content: "This is a sample message content.",
    icon: true,
    state: "default",
    onCancel: () => {},
  },
  render: (args) => (
    <div style={{ padding: 32, background: themeVars.color.background }}>
      <Message {...args} />
    </div>
  ),
} satisfies Meta<typeof Message>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
  args: {
    state: "success",
    title: "Success",
    content: "Your changes have been saved successfully.",
  },
};

export const Warning: Story = {
  args: {
    state: "warning",
    title: "Warning",
    content: "Please review the entered information.",
  },
};

export const Danger: Story = {
  args: {
    state: "danger",
    title: "Danger",
    content: "Something went wrong while processing the request.",
  },
};

export const WithoutIcon: Story = {
  args: {
    icon: false,
    title: "No icon",
    content: "This message is rendered without the leading icon.",
  },
};
