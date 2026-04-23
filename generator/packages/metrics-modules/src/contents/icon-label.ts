import { container, type Node } from "takumi-js/helpers";
import type { CSSProperties } from "react";

export default function iconLabel({
  icon,
  label,
  style,
}: {
  icon: Node;
  label: Node;
  style?: CSSProperties;
}) {
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
