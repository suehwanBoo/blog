"use client";

import { useTheme } from "@/context/theme-context";
import { CheckButton, RadioButton, SwitchButton } from "@boo/ui";
import { useState } from "react";

export default function Test() {
  const { mounted, theme, toggleTheme } = useTheme();
  const [checked, setChecked] = useState(true);
  const [radioValue, setRadioValue] = useState<"one" | "two">("two");
  const checkChange = () => setChecked((prev) => !prev);

  if (!mounted) return <button>로딩중</button>;

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <button onClick={toggleTheme}>{theme} 전환</button>
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
    </div>
  );
}
