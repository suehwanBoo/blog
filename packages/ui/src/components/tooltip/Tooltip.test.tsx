import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tooltip from "./Tooltip";

describe("Tooltip", () => {
  it("renders children as the trigger content", () => {
    render(
      <Tooltip content="tooltip content">
        <button type="button">trigger</button>
      </Tooltip>,
    );

    expect(screen.getByRole("button", { name: "trigger" })).toBeInTheDocument();
  });

  it("shows tooltip content on hover and hides it on unhover", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="tooltip content">
        <button type="button">trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "trigger" });
    const tooltip = screen.getByRole("tooltip");

    expect(trigger).not.toHaveAttribute("aria-describedby");

    await user.hover(trigger);

    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);

    await user.unhover(trigger);

    expect(trigger).not.toHaveAttribute("aria-describedby");
  });

  it("shows tooltip content when the trigger receives keyboard focus", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="tooltip content">
        <button type="button">trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "trigger" });
    const tooltip = screen.getByRole("tooltip");

    await user.tab();

    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
  });

  it("shows tooltip content when controlled open is true", () => {
    render(
      <Tooltip content="tooltip content" open>
        <button type="button">trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "trigger" });
    const tooltip = screen.getByRole("tooltip");

    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
  });

  it("does not open when disabled", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="tooltip content" disabled>
        <button type="button">trigger</button>
      </Tooltip>,
    );

    const tooltip = screen.getByRole("tooltip");
    const trigger = screen.getByRole("button", { name: "trigger" });

    await user.hover(trigger);

    expect(trigger).not.toHaveAttribute("aria-describedby", tooltip.id);
  });
});
