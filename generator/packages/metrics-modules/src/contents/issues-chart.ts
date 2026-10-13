import { container, text, type Node } from "takumi-js/helpers";
import { p } from "../styles";

interface IssuesChartProps {
  items: { value: number; color: string; label: Node }[];
}

export default function issuesChart({ items }: IssuesChartProps): Node {
  const total = items.reduce((acc, item) => acc + item.value, 0);

  return container({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      width: "100%",
    },
    children: [
      container({
        style: {
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: 8,
          borderRadius: 5,
          overflow: "hidden",
          backgroundColor: "#d1d5da",
        },
        children:
          total > 0
            ? items.map(({ value, color }) =>
                container({
                  style: {
                    width: `${(value / total) * 100}%`,
                    height: 8,
                    flexShrink: 0,
                    backgroundColor: color,
                  },
                }),
              )
            : [],
      }),
      container({
        style: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        },
        children: items.map(({ label }) => label),
      }),
    ],
  });
}
