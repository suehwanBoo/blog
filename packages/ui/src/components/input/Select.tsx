import { useState, type ReactNode } from "react";
import { SelectStyles } from "./Select.css";
import { useClickOutside } from "@boo/hooks";

type OptionType<T> = {
  value: T;
  label: string;
};

type SelectProps<O extends OptionType<unknown>> = {
  options: readonly O[];
  value?: O | null;
  placeholder?: string;
  onChange: (v: O) => void;
  disabled?: boolean;
  render: (props: O) => ReactNode;
  ariaLabel: string;
};

export default function Select<O extends OptionType<unknown>>({
  disabled,
  onChange,
  value,
  options,
  render,
  placeholder,
  ariaLabel,
}: SelectProps<O>) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));
  const text = value?.label || placeholder || "-";

  const longestText = [
    placeholder || "",
    ...options.map((option) => option.label),
    "-",
  ]
    .filter(Boolean)
    .reduce((a, b) => (a.length >= b.length ? a : b));
  return (
    <div className={SelectStyles.wrapper} ref={ref}>
      <span className={SelectStyles.sizer} aria-hidden>
        <span>{longestText}</span>
        <DirectionSvg open={false} />
      </span>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={SelectStyles.trigger({
          disabled,
          open,
        })}
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{text}</span>
        <DirectionSvg open={open} />
      </button>
      {open && (
        <ul className={SelectStyles.buttonWrapper} aria-label={ariaLabel}>
          {options.map((props, idx) => (
            <li key={props.label} className={SelectStyles.buttonLi}>
              <button
                type="button"
                className={SelectStyles.button({
                  last: idx === options.length - 1,
                })}
                onClick={() => {
                  onChange(props);
                  setOpen(false);
                }}
              >
                {render(props)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const DirectionSvg = ({ open }: { open: boolean }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={SelectStyles.icon({ open })}
    >
      <path
        d="M12.75 10.5L9 6.75L5.25 10.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
