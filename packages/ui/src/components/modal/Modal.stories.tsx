import type { Meta, StoryObj } from "@storybook/react-vite";
import Modal from "./Modal";
import { themeVars } from "../../theme/theme.css";
import Button from "../button/Button";

const meta = {
  title: "Components/Modal/Modal",
  component: Modal,
  tags: ["autodocs"],
  args: {
    className: "",
    ariaLabel: "modal",
  },
  render: (args) => (
    <div
      style={{
        minHeight: 360,
        padding: 32,
        display: "grid",
        placeItems: "center",
        background: themeVars.color.background,
      }}
    >
      <Modal {...args}>
        <Modal.Header title="Modal title" />
        <Modal.Body>
          <p style={{ margin: 0 }}>
            This is a sample modal body content for previewing the layout.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button ariaLabel="cancel" size="medium" state="danger">
            Cancel
          </Button>
          <Button ariaLabel="confirm" size="medium" state="active">
            Confim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  ),
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ConfirmDialog: Story = {
  render: (args) => (
    <div
      style={{
        minHeight: 360,
        width: "400px",
        padding: "32px",
        display: "grid",
        placeItems: "center",
        background: themeVars.color.background,
      }}
    >
      <Modal {...args}>
        <Modal.Header title="Delete post?" />
        <Modal.Body>
          <p style={{ margin: 0 }}>
            This action cannot be undone. The selected post will be removed
            permanently.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button ariaLabel="cancel" size="medium" state="default">
            Cancel
          </Button>
          <Button ariaLabel="confirm" size="medium" state="active">
            Confim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  ),
};

export const LongContent: Story = {
  render: (args) => (
    <div
      style={{
        minHeight: 360,
        padding: 32,
        display: "grid",
        placeItems: "center",
        background: themeVars.color.background,
      }}
    >
      <Modal {...args}>
        <Modal.Header title="Publish preview" />
        <Modal.Body>
          <p style={{ margin: 0 }}>
            This modal demonstrates taller content. Use it to verify how the
            component behaves when the body contains multiple paragraphs and a
            longer explanation for the user.
          </p>
          <p style={{ margin: "12px 0 0" }}>
            The modal shell should stay readable, balanced, and aligned with the
            rest of the UI package.
          </p>
        </Modal.Body>
        <Modal.Footer
          style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}
        >
          <Button ariaLabel="cancel" size="medium" state="default">
            Cancel
          </Button>
          <Button ariaLabel="confirm" size="medium" state="active">
            Confim
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  ),
};

export const WithoutFooter: Story = {
  render: (args) => (
    <div
      style={{
        minHeight: 360,
        padding: 32,
        display: "grid",
        placeItems: "center",
        background: themeVars.color.background,
      }}
    >
      <Modal {...args}>
        <Modal.Header title="Information" />
        <Modal.Body>
          <p style={{ margin: 0 }}>
            A modal can also be rendered without a footer when no actions are
            needed.
          </p>
        </Modal.Body>
      </Modal>
    </div>
  ),
};
