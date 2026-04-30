import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import SearchInput from "./SearchInput";

describe("SearchInput", () => {
  it("renders a searchable input with the default accessible label", () => {
    render(<SearchInput size="large" />);

    const searchBox = screen.getByRole("searchbox", { name: "search" });

    expect(searchBox).toHaveAttribute("type", "search");
    expect(searchBox).toHaveAttribute("aria-label", "search");

    expect(screen.getByRole("button", { name: "search" })).toBeInTheDocument();
  });

  it("uses a custom label and forwards the disabled state", () => {
    render(
      <SearchInput
        size="small"
        disabled
        aria-label="Search posts"
        placeholder="Search posts"
        onChange={vi.fn()}
      />,
    );

    const wrapper = screen.getByRole("searchbox", { name: "Search posts" });
    const button = screen.getByRole("button", { name: "search" });

    expect(wrapper).toBeDisabled();
    expect(wrapper).toHaveAttribute("placeholder", "Search posts");
    expect(button).toBeDisabled();
  });
});
