import { render, screen } from "@testing-library/react";
import RadioButton from "./RadioButton";

describe("RadioButton", () => {
  it("renders a checked radio input", () => {
    render(
      <RadioButton
        id="popular"
        name="sort"
        ariaLabel="Popular sort"
        checked
        readOnly
      />,
    );

    expect(
      screen.getByRole("radio", { name: "Popular sort" }),
    ).toBeChecked();
  });

  it("forwards disabled to the input", () => {
    render(
      <RadioButton
        id="popular"
        name="sort"
        ariaLabel="Popular sort"
        disabled
        readOnly
      />,
    );

    expect(screen.getByRole("radio", { name: "Popular sort" })).toBeDisabled();
  });
});
