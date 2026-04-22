import RadioButton, { RadioButtonProps } from "./RadioButton";

const meta = {
  title: "Components/Button/Radio",
  component: RadioButton,
  tags: ["autodocs"],
  args: {
    ariaLabel: "Radion setting",
  },
  render: (args: RadioButtonProps) => <RadioButton {...args} />,
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
