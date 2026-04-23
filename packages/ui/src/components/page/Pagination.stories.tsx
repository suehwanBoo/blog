import { useState } from "react";
import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Pagination from "./Pagination";

type PaginationStoryProps = ComponentProps<typeof Pagination>;

const meta = {
  title: "Components/Page/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: {
    currentPage: 3,
    totalPages: 10,
    onPageChange: () => undefined,
  },
  render: (args) => <PaginationStory {...args} />,
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

function PaginationStory({
  currentPage: initialCurrentPage,
  totalPages,
}: PaginationStoryProps) {
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );
}

export const Default: Story = {};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
  },
};
