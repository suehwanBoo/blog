import clsx from "clsx";
import { forwardRef, type ComponentType, type HTMLAttributes } from "react";
import { MessageStyle } from "./message.css";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import CancelIcon from "../../icon/CancelIcon";

type Variants = NonNullable<RecipeVariants<typeof MessageStyle.wrapper>>;
type State = NonNullable<Variants["state"]>;

type StateProps = {
  state: State;
};

type MessageProps = {
  title?: string;
  content: string;
  icon: boolean;
  onCancel: () => void;
} & HTMLAttributes<HTMLDivElement> &
  StateProps;

const IconMapper = {
  default: DefaultIcon,
  success: SuccessIcon,
  danger: DangerIcon,
  warning: WarningIcon,
} satisfies Record<State, ComponentType>;

const Message = forwardRef<HTMLDivElement | null, MessageProps>(
  ({ title, content, icon, onCancel, state, ...rest }, ref) => {
    const Icon = IconMapper[state];
    return (
      <div
        {...rest}
        ref={ref}
        role={state === "danger" ? "alert" : "status"}
        className={clsx(MessageStyle.wrapper({ state }))}
      >
        {icon && <Icon />}
        <div className={MessageStyle.contentWrapper}>
          {title && <h4 className={MessageStyle.title}>{title}</h4>}
          <p className={MessageStyle.content}>{content || "-"}</p>
        </div>
        <button
          type="button"
          aria-label="close message"
          onClick={onCancel}
          className={MessageStyle.cancel}
        >
          <CancelIcon />
        </button>
      </div>
    );
  },
);

export default Message;

function DefaultIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#clip0_76_675)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.0002 2.50004C5.85803 2.50004 2.50016 5.8579 2.50016 10C2.50016 14.1422 5.85803 17.5 10.0002 17.5C14.1423 17.5 17.5002 14.1422 17.5002 10C17.5002 5.8579 14.1423 2.50004 10.0002 2.50004ZM0.833496 10C0.833496 4.93743 4.93755 0.833374 10.0002 0.833374C15.0628 0.833374 19.1668 4.93743 19.1668 10C19.1668 15.0626 15.0628 19.1667 10.0002 19.1667C4.93755 19.1667 0.833496 15.0626 0.833496 10Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.99984 9.16663C10.4601 9.16663 10.8332 9.53972 10.8332 9.99996V13.3333C10.8332 13.7935 10.4601 14.1666 9.99984 14.1666C9.5396 14.1666 9.1665 13.7935 9.1665 13.3333V9.99996C9.1665 9.53972 9.5396 9.16663 9.99984 9.16663Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.1665 6.66671C9.1665 6.20647 9.5396 5.83337 9.99984 5.83337H10.0082C10.4684 5.83337 10.8415 6.20647 10.8415 6.66671C10.8415 7.12694 10.4684 7.50004 10.0082 7.50004H9.99984C9.5396 7.50004 9.1665 7.12694 9.1665 6.66671Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_76_675">
          <rect width="20" height="20" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#clip0_76_1811)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.0527 3.14457C11.5754 2.48633 9.92486 2.32326 8.34731 2.67968C6.76975 3.03611 5.34968 3.89294 4.29887 5.12238C3.24807 6.35182 2.62284 7.888 2.51642 9.50181C2.41001 11.1156 2.82811 12.7206 3.70838 14.0774C4.58865 15.4341 5.88392 16.47 7.40102 17.0305C8.91811 17.591 10.5757 17.6461 12.1267 17.1875C13.6776 16.7289 15.0388 15.7813 16.0072 14.4859C16.9755 13.1906 17.4992 11.6169 17.5002 9.99957V9.23338C17.5002 8.77315 17.8733 8.40005 18.3335 8.40005C18.7937 8.40005 19.1668 8.77315 19.1668 9.23338V10.0001C19.1657 11.9768 18.5256 13.9006 17.3421 15.4839C16.1585 17.0671 14.4948 18.2253 12.5992 18.7858C10.7036 19.3462 8.67765 19.2789 6.82343 18.5939C4.9692 17.9089 3.3861 16.6428 2.31021 14.9845C1.23432 13.3262 0.723305 11.3646 0.853366 9.39215C0.983428 7.41971 1.7476 5.54216 3.03192 4.03951C4.31624 2.53686 6.05188 1.48963 7.98 1.05399C9.90812 0.618361 11.9254 0.817669 13.731 1.62219C14.1514 1.80951 14.3403 2.30216 14.153 2.72255C13.9657 3.14294 13.4731 3.33189 13.0527 3.14457Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.9221 2.74378C19.2477 3.06906 19.248 3.59669 18.9227 3.92229L10.5894 12.264C10.4331 12.4204 10.2211 12.5083 10 12.5083C9.77896 12.5084 9.56691 12.4206 9.41058 12.2643L6.91058 9.76426C6.58514 9.43882 6.58514 8.91118 6.91058 8.58574C7.23602 8.26031 7.76366 8.26031 8.08909 8.58574L9.99954 10.4962L17.7436 2.74437C18.0689 2.41877 18.5965 2.41851 18.9221 2.74378Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_76_1811">
          <rect width="20" height="20" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  );
}

function DangerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g clipPath="url(#clip0_76_1841)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.96091 1.07745C6.11719 0.921171 6.32915 0.833374 6.55016 0.833374H13.4502C13.6712 0.833374 13.8831 0.921171 14.0394 1.07745L18.9228 5.96078C19.079 6.11706 19.1668 6.32903 19.1668 6.55004V13.45C19.1668 13.6711 19.079 13.883 18.9228 14.0393L14.0394 18.9226C13.8831 19.0789 13.6712 19.1667 13.4502 19.1667H6.55016C6.32915 19.1667 6.11719 19.0789 5.96091 18.9226L1.07757 14.0393C0.921293 13.883 0.833496 13.6711 0.833496 13.45V6.55004C0.833496 6.32903 0.921293 6.11706 1.07757 5.96078L5.96091 1.07745ZM6.89534 2.50004L2.50016 6.89522V13.1049L6.89534 17.5H13.105L17.5002 13.1049V6.89522L13.105 2.50004H6.89534Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.0891 6.9107C13.4145 7.23614 13.4145 7.76378 13.0891 8.08921L8.08909 13.0892C7.76366 13.4147 7.23602 13.4147 6.91058 13.0892C6.58514 12.7638 6.58514 12.2361 6.91058 11.9107L11.9106 6.9107C12.236 6.58527 12.7637 6.58527 13.0891 6.9107Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.91058 6.9107C7.23602 6.58527 7.76366 6.58527 8.08909 6.9107L13.0891 11.9107C13.4145 12.2361 13.4145 12.7638 13.0891 13.0892C12.7637 13.4147 12.236 13.4147 11.9106 13.0892L6.91058 8.08921C6.58514 7.76378 6.58514 7.23614 6.91058 6.9107Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_76_1841">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.77348 1.90259C9.14789 1.69179 9.57031 1.58105 9.99998 1.58105C10.4296 1.58105 10.8521 1.69179 11.2265 1.90259C11.6009 2.11338 11.9146 2.41712 12.1375 2.78448L12.1399 2.78844L19.1982 14.5718L19.205 14.5833C19.4233 14.9613 19.5388 15.3899 19.54 15.8264C19.5412 16.263 19.4281 16.6922 19.2119 17.0714C18.9958 17.4507 18.6841 17.7667 18.3078 17.9881C17.9316 18.2095 17.504 18.3285 17.0675 18.3333L17.0583 18.3334L2.93248 18.3333C2.49598 18.3285 2.06834 18.2095 1.69212 17.9881C1.31589 17.7667 1.00419 17.4507 0.788018 17.0714C0.571848 16.6922 0.458748 16.263 0.459971 15.8264C0.461193 15.3899 0.576695 14.9613 0.794985 14.5833L0.801754 14.5718L7.86247 2.78448C8.0853 2.41711 8.39908 2.11338 8.77348 1.90259ZM9.99998 3.24772C9.85675 3.24772 9.71595 3.28463 9.59115 3.3549C9.46691 3.42485 9.3627 3.52549 9.28849 3.64721L2.23555 15.4215C2.16457 15.5464 2.12703 15.6874 2.12663 15.8311C2.12622 15.9766 2.16392 16.1197 2.23598 16.2461C2.30804 16.3725 2.41194 16.4779 2.53735 16.5517C2.66166 16.6248 2.80281 16.6644 2.94697 16.6667H17.053C17.1971 16.6644 17.3383 16.6248 17.4626 16.5517C17.588 16.4779 17.6919 16.3725 17.764 16.2461C17.836 16.1197 17.8737 15.9766 17.8733 15.8311C17.8729 15.6875 17.8354 15.5464 17.7644 15.4216L10.7125 3.64886C10.7121 3.64831 10.7118 3.64776 10.7115 3.64721C10.6373 3.52549 10.533 3.42485 10.4088 3.3549C10.284 3.28463 10.1432 3.24772 9.99998 3.24772Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.99984 6.66675C10.4601 6.66675 10.8332 7.03984 10.8332 7.50008V10.8334C10.8332 11.2937 10.4601 11.6667 9.99984 11.6667C9.5396 11.6667 9.1665 11.2937 9.1665 10.8334V7.50008C9.1665 7.03984 9.5396 6.66675 9.99984 6.66675Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.1665 14.1666C9.1665 13.7063 9.5396 13.3333 9.99984 13.3333H10.0082C10.4684 13.3333 10.8415 13.7063 10.8415 14.1666C10.8415 14.6268 10.4684 14.9999 10.0082 14.9999H9.99984C9.5396 14.9999 9.1665 14.6268 9.1665 14.1666Z"
        fill="currentColor"
      />
    </svg>
  );
}
