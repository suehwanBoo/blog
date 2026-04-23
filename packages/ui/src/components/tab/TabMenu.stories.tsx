import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import TabMenu from "./TabMenu";

const meta = {
  title: "Components/Tab/TabMenu",
  component: TabMenu,
  tags: ["autodocs"],
  args: {
    role: "tablist",
  },
  render: (args) => (
    <TabMenu {...args}>
      <TabMenu.Button active line>
        All
      </TabMenu.Button>
      <TabMenu.Button active={false} line>
        Published
      </TabMenu.Button>
      <TabMenu.Button active={false} line>
        Drafts
      </TabMenu.Button>
    </TabMenu>
  ),
} satisfies Meta<typeof TabMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
};

export const ActiveSecondTab: Story = {
  args: {
    children: null,
  },
  render: (args: ComponentProps<typeof TabMenu>) => (
    <TabMenu {...args}>
      <TabMenu.Button active={false} line>
        All
      </TabMenu.Button>
      <TabMenu.Button active line>
        Published
      </TabMenu.Button>
      <TabMenu.Button active={false} line>
        Drafts
      </TabMenu.Button>
    </TabMenu>
  ),
};

export const WithoutLine: Story = {
  args: {
    children: null,
  },
  render: (args: ComponentProps<typeof TabMenu>) => (
    <TabMenu {...args}>
      <TabMenu.Button active line={false}>
        All
      </TabMenu.Button>
      <TabMenu.Button active={false} line={false}>
        Published
      </TabMenu.Button>
      <TabMenu.Button active={false} line={false}>
        Drafts
      </TabMenu.Button>
    </TabMenu>
  ),
};
