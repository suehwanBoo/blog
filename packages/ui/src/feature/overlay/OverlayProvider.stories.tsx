import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import { themeVars } from "../../theme/theme.css";
import OverlayProvider from "./context/OverlayProvider";
import useOverlay from "./hooks/useOverlay";

function OverlayDemo() {
  const overlay = useOverlay();

  const openConfirm = () => {
    overlay.open(({ close }) => (
      <Modal ariaLabel="Publish confirmation">
        <Modal.Header title="Publish post?" closeHandler={close} />
        <Modal.Body>
          <p style={{ margin: 0 }}>
            This overlay is opened through the shared overlay controller and
            rendered in a portal.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            ariaLabel="Cancel publish"
            size="medium"
            state="default"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            ariaLabel="Confirm publish"
            size="medium"
            state="active"
            onClick={close}
          >
            Publish
          </Button>
        </Modal.Footer>
      </Modal>
    ));
  };

  const openLocked = () => {
    overlay.open(
      ({ close }) => (
        <Modal ariaLabel="Required action">
          <Modal.Header title="Required action" closeHandler={close} />
          <Modal.Body>
            <p style={{ margin: 0 }}>
              Backdrop click and Escape are disabled for this overlay. Close it
              from an explicit action.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              ariaLabel="Complete action"
              size="medium"
              state="active"
              onClick={close}
            >
              Complete
            </Button>
          </Modal.Footer>
        </Modal>
      ),
      { closeOnBackdrop: false, closeOnEsc: false },
    );
  };

  const openStack = () => {
    overlay.open(({ close }) => (
      <Modal ariaLabel="First stacked overlay">
        <Modal.Header title="First overlay" closeHandler={close} />
        <Modal.Body>
          <p style={{ margin: 0 }}>
            Open a second overlay to verify stacking, inert background layers,
            and top-layer Escape handling.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            ariaLabel="Open second overlay"
            size="medium"
            state="active"
            onClick={() => {
              overlay.open(({ close: closeSecond }) => (
                <Modal ariaLabel="Second stacked overlay">
                  <Modal.Header
                    title="Second overlay"
                    closeHandler={closeSecond}
                  />
                  <Modal.Body>
                    <p style={{ margin: 0 }}>
                      This is the top overlay. Escape or backdrop closes this
                      layer first.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      ariaLabel="Close second overlay"
                      size="medium"
                      state="active"
                      onClick={closeSecond}
                    >
                      Close second
                    </Button>
                  </Modal.Footer>
                </Modal>
              ));
            }}
          >
            Open second
          </Button>
          <Button
            ariaLabel="Close first overlay"
            size="medium"
            state="default"
            onClick={close}
          >
            Close first
          </Button>
        </Modal.Footer>
      </Modal>
    ));
  };

  return (
    <div
      style={{
        minHeight: 360,
        padding: 32,
        display: "grid",
        alignContent: "center",
        gap: 16,
        background: themeVars.color.background,
      }}
    >
      <div>
        <h3 style={{ margin: "0 0 8px" }}>Overlay controller</h3>
        <p style={{ margin: 0, maxWidth: 560 }}>
          Use the buttons below to inspect portal rendering, backdrop close,
          Escape close, scroll lock, and stacked overlay behavior.
        </p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <Button
          ariaLabel="Open confirm overlay"
          size="medium"
          state="active"
          onClick={openConfirm}
        >
          Open confirm
        </Button>
        <Button
          ariaLabel="Open locked overlay"
          size="medium"
          state="default"
          onClick={openLocked}
        >
          Open locked
        </Button>
        <Button
          ariaLabel="Open stacked overlays"
          size="medium"
          state="default"
          onClick={openStack}
        >
          Open stacked
        </Button>
        <Button
          ariaLabel="Close all overlays"
          size="medium"
          state="danger"
          onClick={overlay.closeAll}
        >
          Close all
        </Button>
      </div>
    </div>
  );
}

function OverlayStory() {
  return (
    <OverlayProvider>
      <OverlayDemo />
    </OverlayProvider>
  );
}

const meta = {
  title: "Components/Overlay/OverlayProvider",
  component: OverlayStory,
  tags: ["autodocs"],
  render: () => <OverlayStory />,
} satisfies Meta<typeof OverlayStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
