import clsx from "clsx";
import { forwardRef, type HTMLAttributes, type PropsWithChildren } from "react";
import { ModalStyle } from "./Modal.css";
import CancelIcon from "../../icon/CancelIcon";

type ModalProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> & {
    ariaLabel: string;
  };

type TitleProps = {
  title: string;
  closeHandler: () => void;
};

const Modal = Object.assign(
  forwardRef<HTMLDivElement | null, ModalProps>(
    ({ className, children, ariaLabel, ...rest }, ref) => {
      return (
        <div
          {...rest}
          ref={ref}
          aria-label={ariaLabel}
          role="dialog"
          aria-modal="true"
          className={clsx(ModalStyle.wrapper, className)}
        >
          {children}
        </div>
      );
    },
  ),
  { Header, Body, Footer },
);

function Header({ title, closeHandler }: TitleProps) {
  return (
    <div className={ModalStyle.header}>
      <h3 className={ModalStyle.title}>{title || "-"}</h3>
      <button
        type="button"
        aria-label="close modal"
        className={ModalStyle.button}
        onClick={closeHandler}
      >
        <CancelIcon />
      </button>
    </div>
  );
}

function Body({
  children,
  className,
  ...rest
}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={clsx(ModalStyle.body, className)}>
      {children}
    </div>
  );
}

function Footer({
  children,
  className,
  ...rest
}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={clsx(ModalStyle.footer, className)}>
      {children}
    </div>
  );
}

export default Modal;
