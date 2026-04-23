import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders its content and handles clicks", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button
        ariaLabel="Create post"
        size="medium"
        state="default"
        onClick={onClick}
      >
        Create post
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Create post" });

    expect(button).toHaveTextContent("Create post");

    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disables the native button when the state is disabled", () => {
    render(
      <Button ariaLabel="Create post" size="medium" state="disabled">
        Create post
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Create post" })).toBeDisabled();
  });
});
