import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "../button/Button";
import Tooltip from "./Tooltip";

const meta = {
  title: "Components/Tooltip/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: {
    content: "게시글 상태를 확인할 수 있습니다.",
    placement: "top",
    children: (
      <Button ariaLabel="Tooltip trigger" size="medium" state="default">
        Hover or focus
      </Button>
    ),
  },
  render: (args) => <Tooltip {...args} />,
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bottom: Story = {
  args: {
    placement: "bottom",
  },
};

export const WithTextTrigger: Story = {
  args: {
    content: "텍스트도 트리거로 사용할 수 있습니다.",
    children: <span>도움말 보기</span>,
  },
};

export const Open: Story = {
  args: {
    open: true,
  },
};
