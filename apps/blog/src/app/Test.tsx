"use client";

import { Button, CheckButton, Modal, RadioButton, SwitchButton } from "@boo/ui";
import { useState } from "react";
import { Pagination, Select } from "@boo/ui/client";

type OptionType = { label: string; value: string };

export default function Test() {
  const [checked, setChecked] = useState(true);
  const [radioValue, setRadioValue] = useState<"one" | "two">("two");
  const checkChange = () => setChecked((prev) => !prev);
  const [page, setPage] = useState(1);
  const [selectValue, setSelectValue] = useState<OptionType | null>(null);

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <SwitchButton
          ariaLabel="스위치 테스트"
          checked={checked}
          onClick={checkChange}
        />
        <RadioButton
          ariaLabel="라디오 1"
          id="radio-one"
          name="test-group"
          checked={radioValue === "one"}
          onChange={() => setRadioValue("one")}
        />

        <RadioButton
          ariaLabel="라디오 2"
          id="radio-two"
          name="test-group"
          checked={radioValue === "two"}
          onChange={() => setRadioValue("two")}
        />

        <CheckButton
          ariaLabel="체크 박스"
          id="check"
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
        />
        <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
        <Select
          ariaLabel="select"
          options={[
            { label: "select1", value: "select1" },
            { label: "select2", value: "select2" },
            { label: "LongLongLongLongLong", value: "select2" },
          ]}
          render={({ label }) => <>{label}</>}
          onChange={setSelectValue}
          value={selectValue}
        />
      </div>
      <DeleteModal />
    </>
  );
}

function DeleteModal() {
  return (
    <Modal ariaLabel="delete modal">
      <Modal.Header title="Delete post?" />
      <Modal.Body>
        <p style={{ margin: 0 }}>
          This action cannot be undone. The selected post will be removed
          permanently.
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
  );
}
