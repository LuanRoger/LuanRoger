import { container, type Node } from "@takumi-rs/helpers";
import type { CSSProperties } from "react";

export default function IconLabel(
  icon: Node,
  label: Node,
  style?: CSSProperties,
) {
  return container({
    style: style ?? {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    children: [icon, label],
  });
}
