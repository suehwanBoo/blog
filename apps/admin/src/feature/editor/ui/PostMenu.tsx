import { postMenuStyles as styles } from "./PostMenu.css";
import useToolbarDrag from "../hooks/useToolbarDrag";
import type { PropsWithChildren } from "react";
import Heading from "../menus/Heading";
import TextAlign from "../menus/TextAlign";
import Italic from "../menus/Italic";
import UnderLine from "../menus/UnderLine";
import Bold from "../menus/Bold";
import Strike from "../menus/Strike";
import Highlight from "../menus/Highlight";
import Blockquote from "../menus/Blockquote";
import OrderList from "../menus/OrderList";
import HorizontalRule from "../menus/HorizontalRule";
import BulletList from "../menus/BulletList";
import OgLink from "../menus/OgLink";

export default function PostMenu() {
  const {
    ref,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    onClickCapture,
  } = useToolbarDrag();

  return (
    <div
      className={styles.wrapper}
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onClickCapture={onClickCapture}
    >
      <HeadingMenus />
      <AlignMenus />
      <WordMenus />
      <NodeMenus />
      <CustomMenus />
    </div>
  );
}

function WordMenus() {
  return (
    <Divider>
      <Italic />
      <UnderLine />
      <Bold />
      <Strike />
      <Highlight />
    </Divider>
  );
}

function NodeMenus() {
  return (
    <Divider>
      <HorizontalRule />
      <Blockquote />
      <BulletList />
      <OrderList />
    </Divider>
  );
}

function CustomMenus() {
  return (
    <Divider>
      <OgLink />
    </Divider>
  );
}

function HeadingMenus() {
  return (
    <Divider>
      <Heading value="h2" />
      <Heading value="h3" />
      <Heading value="h4" />
    </Divider>
  );
}

function AlignMenus() {
  return (
    <Divider>
      <TextAlign align="left" />
      <TextAlign align="center" />
      <TextAlign align="right" />
    </Divider>
  );
}

function Divider({ children }: PropsWithChildren) {
  return <div className={styles.divider}>{children}</div>;
}
