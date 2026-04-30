import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import OverlayProvider from "./context/OverlayProvider";
import useOverlay from "./hooks/useOverlay";
import { overlayStore } from "./store/overlay";

function OverlayTrigger() {
  const overlay = useOverlay();

  return (
    <>
      <button
        type="button"
        onClick={() =>
          overlay.open(({ close }) => (
            <div>
              <h2>First overlay</h2>
              <button type="button" onClick={close}>
                Close first
              </button>
            </div>
          ))
        }
      >
        Open first
      </button>
      <button
        type="button"
        onClick={() =>
          overlay.open(
            () => (
              <div>
                <h2>Locked overlay</h2>
              </div>
            ),
            { closeOnBackdrop: false, closeOnEsc: false },
          )
        }
      >
        Open locked
      </button>
      <button type="button" onClick={overlay.closeAll}>
        Close all
      </button>
    </>
  );
}

function renderOverlay() {
  return render(
    <OverlayProvider>
      <OverlayTrigger />
    </OverlayProvider>,
  );
}

afterEach(() => {
  overlayStore.closeAll();
  document.body.style.overflow = "";
});

describe("OverlayProvider", () => {
  it("opens an overlay and closes it through the render controls", async () => {
    const user = userEvent.setup();

    renderOverlay();

    await user.click(screen.getByRole("button", { name: "Open first" }));

    expect(
      screen.getByRole("heading", { name: "First overlay" }),
    ).toBeInTheDocument();
    expect(document.body).toHaveStyle({ overflow: "hidden" });

    await user.click(screen.getByRole("button", { name: "Close first" }));

    await waitFor(() => {
      expect(
        screen.queryByRole("heading", { name: "First overlay" }),
      ).not.toBeInTheDocument();
    });
    expect(document.body.style.overflow).toBe("");
  });

  it("closes only the top overlay with Escape", async () => {
    const user = userEvent.setup();

    renderOverlay();

    await user.click(screen.getByRole("button", { name: "Open first" }));
    await user.click(screen.getByRole("button", { name: "Open first" }));

    expect(
      screen.getAllByRole("heading", {
        name: "First overlay",
        hidden: true,
      }),
    ).toHaveLength(2);

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(
        screen.getAllByRole("heading", {
          name: "First overlay",
          hidden: true,
        }),
      ).toHaveLength(1);
    });
  });

  it("respects closeOnEsc and closeOnBackdrop options", async () => {
    const user = userEvent.setup();

    renderOverlay();

    await user.click(screen.getByRole("button", { name: "Open locked" }));

    expect(
      screen.getByRole("heading", { name: "Locked overlay" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(
      screen.getByRole("heading", { name: "Locked overlay" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "close modal" }));
    expect(
      screen.getByRole("heading", { name: "Locked overlay" }),
    ).toBeInTheDocument();
  });

  it("closes all active overlays from the provider controller", async () => {
    const user = userEvent.setup();

    renderOverlay();

    await user.click(screen.getByRole("button", { name: "Open first" }));
    await user.click(screen.getByRole("button", { name: "Open locked" }));

    expect(screen.getAllByRole("dialog", { hidden: true })).toHaveLength(2);

    await user.click(screen.getByRole("button", { name: "Close all" }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
