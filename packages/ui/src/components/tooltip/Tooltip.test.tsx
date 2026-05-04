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
    const tooltipTrigger = trigger.parentElement;
    const tooltip = screen.getByRole("tooltip");

    expect(tooltipTrigger).not.toHaveAttribute("aria-describedby");

    await user.hover(trigger);

    expect(tooltipTrigger).toHaveAttribute("aria-describedby", tooltip.id);

    await user.unhover(trigger);

    expect(tooltipTrigger).not.toHaveAttribute("aria-describedby");
  });

  it("shows tooltip content when the trigger receives keyboard focus", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip content="tooltip content">
        <button type="button">trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "trigger" });
    const tooltipTrigger = trigger.parentElement;
    const tooltip = screen.getByRole("tooltip");

    await user.tab();

    expect(trigger).toHaveFocus();
    expect(tooltipTrigger).toHaveAttribute("aria-describedby", tooltip.id);
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
    const tooltipTrigger = trigger.parentElement;

    await user.hover(trigger);

    expect(tooltipTrigger).not.toHaveAttribute("aria-describedby", tooltip.id);
  });
});
