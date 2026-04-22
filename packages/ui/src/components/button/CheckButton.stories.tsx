import CheckButton, { CheckButtonProps } from "./CheckButton";

const meta = {
  title: "Components/Button/Check",
  component: CheckButton,
  tags: ["autodocs"],
  args: {
    ariaLabel: "Check setting",
  },
  render: (args: CheckButtonProps) => <CheckButton {...args} />,
};

export default meta;

export const Default = {
  args: {
    checked: false,
    disabled: false,
  },
};

export const Active = {
  args: {
    checked: true,
    disabled: false,
  },
};

export const Disabled = {
  args: {
    checked: false,
    disabled: true,
  },
};

export const CheckedDisabled = {
  args: {
    checked: true,
    disabled: true,
  },
};
