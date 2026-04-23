import { render, screen } from "@testing-library/react";
import CheckButton from "./CheckButton";

describe("CheckButton", () => {
  it("renders a checkbox input with the provided label and checked state", () => {
    render(
      <CheckButton
        id="newsletter"
        ariaLabel="Subscribe to newsletter"
        checked
        readOnly
      />,
    );

    const checkbox = screen.getByRole("checkbox", {
      name: "Subscribe to newsletter",
    });

    expect(checkbox).toBeChecked();
  });

  it("forwards the disabled state to the checkbox input", () => {
    render(
      <CheckButton
        id="newsletter"
        ariaLabel="Subscribe to newsletter"
        disabled
        readOnly
      />,
    );

    expect(
      screen.getByRole("checkbox", { name: "Subscribe to newsletter" }),
    ).toBeDisabled();
  });
});
