import { Modal } from "@boo/ui";
import SubscribeForm from "./SubscribeForm";

type SubscribeModalProps = {
  close: () => void;
};

export default function SubscribeModal({ close }: SubscribeModalProps) {
  return (
    <Modal ariaLabel="subscribe modal">
      <Modal.Header title="구독하기" closeHandler={close} />
      <Modal.Body>
        <SubscribeForm />
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
}
