import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "../../components/button/Button";
import { themeVars } from "../../theme/theme.css";
import { ToastProvider, useToast } from "./index";

function ToastDemo() {
  const toast = useToast();

  const showToast = (
    title: string,
    description: string,
    variant?: "default" | "success" | "danger" | "warning",
  ) => {
    toast.apply({
      title,
      description,
      ...(variant ? { variant } : {}),
    });
  };

  return (
    <div
      style={{
        minHeight: 360,
        padding: 32,
        display: "grid",
        gap: 16,
        alignContent: "center",
        background: themeVars.color.background,
      }}
    >
      <div>
        <h3 style={{ margin: "0 0 8px" }}>Toast controller</h3>
        <p style={{ margin: 0, maxWidth: 560 }}>
          Trigger toasts from the shared provider and inspect portal rendering,
          stacking, and dismiss behavior.
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Button
          ariaLabel="Show default toast"
          size="medium"
          state="default"
          onClick={() =>
            showToast(
              "Draft saved",
              "Your changes have been saved locally.",
            )
          }
        >
          Show default
        </Button>
        <Button
          ariaLabel="Show success toast"
          size="medium"
          state="active"
          onClick={() =>
            showToast(
              "Published",
              "The post is now visible to readers.",
              "success",
            )
          }
        >
          Show success
        </Button>
        <Button
          ariaLabel="Show warning toast"
          size="medium"
          state="default"
          onClick={() =>
            showToast(
              "Review required",
              "Please check the content before publishing.",
              "warning",
            )
          }
        >
          Show warning
        </Button>
        <Button
          ariaLabel="Show danger toast"
          size="medium"
          state="danger"
          onClick={() =>
            showToast(
              "Publish failed",
              "The server rejected the request.",
              "danger",
            )
          }
        >
          Show danger
        </Button>
        <Button
          ariaLabel="Clear all toasts"
          size="medium"
          state="clicked"
          onClick={() => toast.removeAll()}
        >
          Clear all
        </Button>
      </div>
    </div>
  );
}

function ToastStory() {
  return (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  );
}

const meta = {
  title: "Features/Toast/ToastProvider",
  component: ToastStory,
  tags: ["autodocs"],
  render: () => <ToastStory />,
} satisfies Meta<typeof ToastStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
