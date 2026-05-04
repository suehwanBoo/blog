import clsx from "clsx";
import {
  type AriaAttributes,
  cloneElement,
  type FocusEvent,
  type HTMLAttributes,
  isValidElement,
  type MouseEvent,
  type PropsWithChildren,
  type ReactNode,
  useId,
  useState,
} from "react";
import { arrowRecipe, tooltipRecipe, wrapper } from "./Tooltip.css";

export type TooltipPlacement = "top" | "right" | "bottom" | "left";

export type TooltipProps = Omit<HTMLAttributes<HTMLSpanElement>, "content"> &
  PropsWithChildren<{
    content: ReactNode;
    placement?: TooltipPlacement;
    disabled?: boolean;
    open?: boolean;
    defaultOpen?: boolean;
  }>;

export default function Tooltip({
  children,
  content,
  placement = "top",
  disabled = false,
  open,
  defaultOpen = false,
  className,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...rest
}: TooltipProps) {
  const tooltipId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = !disabled && (isControlled ? open : uncontrolledOpen);

  const show = () => {
    if (!isControlled) {
      setUncontrolledOpen(true);
    }
  };

  const hide = () => {
    if (!isControlled) {
      setUncontrolledOpen(false);
    }
  };

  const handleMouseEnter = (event: MouseEvent<HTMLSpanElement>) => {
    onMouseEnter?.(event);
    show();
  };

  const handleMouseLeave = (event: MouseEvent<HTMLSpanElement>) => {
    onMouseLeave?.(event);
    hide();
  };

  const handleFocus = (event: FocusEvent<HTMLSpanElement>) => {
    onFocus?.(event);
    show();
  };

  const handleBlur = (event: FocusEvent<HTMLSpanElement>) => {
    onBlur?.(event);
    hide();
  };

  return (
    <span
      {...rest}
      className={clsx(wrapper, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {isValidElement<AriaAttributes>(children)
        ? cloneElement(children, {
            "aria-describedby": isOpen ? tooltipId : undefined,
          })
        : children}
      <span
        id={tooltipId}
        role="tooltip"
        className={tooltipRecipe({ placement, open: isOpen })}
      >
        {content}
        <span className={arrowRecipe({ placement })} aria-hidden="true" />
      </span>
    </span>
  );
}
