import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Select from "./Select";

type Option = {
  value: string;
  label: string;
};

const options: readonly Option[] = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "recommended", label: "Recommended" },
];

describe("Select", () => {
  it("renders the placeholder in the trigger when no value is selected", () => {
    render(
      <Select
        options={options}
        value={null}
        placeholder="Choose a sort order"
        onChange={vi.fn()}
        render={(option) => option.label}
        ariaLabel="Sort posts"
      />,
    );

    const trigger = screen.getByRole("button", { name: "Sort posts" });

    expect(
      within(trigger).getByText("Choose a sort order"),
    ).toBeInTheDocument();
  });

  it("renders the selected label and notifies when an option is chosen", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Select
        options={options}
        value={options[1]}
        onChange={onChange}
        render={(option) => option.label}
        ariaLabel="Sort posts"
      />,
    );

    const trigger = screen.getByRole("button", { name: "Sort posts" });

    await user.click(trigger);

    await user.click(screen.getByRole("button", { name: "Recommended" }));

    expect(onChange).toHaveBeenCalledWith(options[2]);
  });
});
