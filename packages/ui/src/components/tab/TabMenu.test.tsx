import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import TabMenu from "./TabMenu";

describe("TabMenu", () => {
  it("renders a tab list with clickable tabs", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <TabMenu role="tablist">
        <TabMenu.Button active line onClick={onClick}>
          All
        </TabMenu.Button>
        <TabMenu.Button active={false} line>
          Drafts
        </TabMenu.Button>
      </TabMenu>,
    );

    expect(screen.getByRole("tablist")).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "All" }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("tab", { name: "Drafts" })).toBeInTheDocument();
  });
});
