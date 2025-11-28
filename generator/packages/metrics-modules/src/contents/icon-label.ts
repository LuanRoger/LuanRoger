import { container, type Node } from "@takumi-rs/helpers";

export default function IconLabel(icon: Node, label: Node) {
  return container({
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    children: [icon, label],
  });
}
