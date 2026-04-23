import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import SwitchButton from "./SwitchButton";

describe("SwitchButton", () => {
  it("renders a switch with the checked state", () => {
    render(<SwitchButton ariaLabel="Enable comments" checked />);

    const switchButton = screen.getByRole("switch", {
      name: "Enable comments",
    });

    expect(switchButton).toHaveAttribute("aria-checked", "true");
  });

  it("forwards clicks to the provided handler", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <SwitchButton ariaLabel="Enable comments" checked={false} onClick={onClick} />,
    );

    await user.click(screen.getByRole("switch", { name: "Enable comments" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("forwards the disabled state", () => {
    render(<SwitchButton ariaLabel="Enable comments" checked disabled />);

    expect(screen.getByRole("switch", { name: "Enable comments" })).toBeDisabled();
  });
});
