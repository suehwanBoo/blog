import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./Button";

const meta = {
  title: "Components/Button/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    ariaLabel: "Button setting",
    children: "Button",
    size: "medium",
    state: "default",
  },
  render: (args) => <Button {...args} />,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default",
  },
};

export const Active: Story = {
  args: {
    children: "Active",
    state: "active",
  },
};

export const Clicked: Story = {
  args: {
    children: "Clicked",
    state: "clicked",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "large",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    state: "disabled",
  },
};
