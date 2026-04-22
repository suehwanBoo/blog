import SwitchButton, { SwitchButtonProps } from "./SwitchButton";

const meta = {
  title: "Components/Button/Switch",
  component: SwitchButton,
  tags: ["autodocs"],
  args: {
    ariaLabel: "Switch setting",
  },
  render: (args: SwitchButtonProps) => <SwitchButton {...args} />,
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
    disabled: true,
  },
};
