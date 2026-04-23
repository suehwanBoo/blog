import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Select from "./Select";

type SelectOption = {
  value: string;
  label: string;
};

const options: SelectOption[] = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "recommended", label: "Recommended" },
];

function SelectStory({
  placeholder = "Choose an option",
  disabled = false,
}: {
  placeholder?: string;
  disabled?: boolean;
}) {
  const [value, setValue] = useState<SelectOption | null>(null);

  return (
    <div>
      <Select
        placeholder={placeholder}
        disabled={disabled}
        options={options}
        value={value}
        onChange={(next: SelectOption) => setValue(next)}
        render={(option: SelectOption) => option.label}
        ariaLabel="select test"
      />
    </div>
  );
}

const meta = {
  title: "Components/Input/Select",
  component: SelectStory,
  tags: ["autodocs"],
  args: {
    placeholder: "Choose an option",
    disabled: false,
  },
  render: (args) => <SelectStory {...args} />,
} satisfies Meta<typeof SelectStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
