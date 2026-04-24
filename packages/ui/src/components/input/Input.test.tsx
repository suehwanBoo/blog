import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Input from "./Input";

describe("Input", () => {
  it("renders a native input with the provided props", () => {
    render(
      <Input
        aria-label="Post title"
        placeholder="Enter title"
        type="text"
        defaultValue="Hello"
      />,
    );

    const input = screen.getByRole("textbox", { name: "Post title" });

    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("placeholder", "Enter title");
    expect(input).toHaveValue("Hello");
  });

  it("forwards disabled and custom class names", () => {
    render(
      <Input
        aria-label="Post title"
        disabled
        className="custom-input"
        onChange={vi.fn()}
      />,
    );

    const input = screen.getByRole("textbox", { name: "Post title" });

    expect(input).toBeDisabled();
    expect(input).toHaveClass("custom-input");
  });
});
