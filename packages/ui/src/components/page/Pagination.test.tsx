import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("navigates to the previous and next pages", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination currentPage={2} totalPages={4} onPageChange={onPageChange} />,
    );

    await user.click(screen.getByRole("button", { name: "Previous page" }));
    await user.click(screen.getByRole("button", { name: "Next page" }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 1);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 3);
    expect(screen.getByText("2 of 4")).toBeInTheDocument();
  });

  it("disables boundary controls", () => {
    render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} />,
    );

    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("calls the error trigger when the current page is out of range", () => {
    const errorTrigger = vi.fn();

    render(
      <Pagination
        currentPage={0}
        totalPages={3}
        onPageChange={vi.fn()}
        errorTrigger={errorTrigger}
      />,
    );

    expect(errorTrigger).toHaveBeenCalledWith(0, 3);
  });
});
