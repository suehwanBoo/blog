import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders text", () => {
    render(<Button></Button>);
    expect(screen.getByText("asd")).toBeInTheDocument();
  });
});
