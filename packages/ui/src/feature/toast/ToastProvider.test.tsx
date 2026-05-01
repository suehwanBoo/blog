import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useToast from "./hooks/useToast";
import { toastStore } from "./store/toast";
import ToastProvider from "./context/ToastProvider";

function ToastTrigger() {
  const toast = useToast();

  return (
    <button
      type="button"
      onClick={() =>
        toast.apply({
          title: "Saved",
          description: "Post has been saved.",
          duration: 0,
        })
      }
    >
      Show toast
    </button>
  );
}

function renderToastProvider() {
  return render(
    <ToastProvider>
      <ToastTrigger />
    </ToastProvider>,
  );
}

describe("ToastProvider", () => {
  afterEach(() => {
    act(() => {
      toastStore.removeAll();
    });
  });

  it("shows a toast when the trigger button is clicked", async () => {
    const user = userEvent.setup();

    renderToastProvider();

    await user.click(screen.getByRole("button", { name: "Show toast" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Post has been saved.",
    );
  });

  it("sets data-visible to false when the close button is clicked", async () => {
    const user = userEvent.setup();

    renderToastProvider();

    await user.click(screen.getByRole("button", { name: "Show toast" }));

    const toast = screen.getByRole("status");

    expect(toast).toHaveAttribute("data-visible", "true");

    await user.click(screen.getByRole("button", { name: "close message" }));

    expect(toast).toHaveAttribute("data-visible", "false");
  });
});
