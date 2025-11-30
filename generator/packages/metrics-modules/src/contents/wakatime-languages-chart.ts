import { container, text, type Node } from "@takumi-rs/helpers";
import type { WakatimeLanguages } from "../services/wakatime/interfaces";
import { h3, p } from "@/styles";

type ChartKey = "languages" | "categories";

interface ChartItem {
  name: string;
  percent: number;
}

const chartTitles: Record<ChartKey, string> = {
  languages: "Language activity",
  categories: "Category activity",
};

const levelColors: Record<number, string> = {
  1: "#9be9a8",
  2: "#40c463",
  3: "#30a14e",
  4: "#216e39",
};

function getBarColor(percent: number): string {
  const level = Math.min(4, Math.max(1, Math.ceil(percent / 0.25)));
  return levelColors[level] ?? levelColors[1]!;
}

interface WakatimeChartProps {
  key: ChartKey;
  section: ChartItem[];
  limit?: number;
}

function wakatimeChart({ key, section, limit = 5 }: WakatimeChartProps): Node {
  const title = chartTitles[key];
  const limitedSection = section?.slice(0, limit) ?? [];

  const emptyState = [
    container({
      style: {
        display: "flex",
        justifyContent: "center",
        padding: 16,
      },
      children: [
        text("No activity", {
          ...p,
          color: "#999999",
        }),
      ],
    }),
  ];

  const chartContent: Node[] = limitedSection?.length
    ? limitedSection.map(({ name, percent }) =>
        container({
          style: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            width: "100%",
          },
          children: [
            text(name, {
              ...p,
              width: 100,
              flexShrink: 0,
            }),
            container({
              style: {
                width: `${percent}%`,
                height: 14,
                backgroundColor: getBarColor(percent),
                borderRadius: 99,
              },
            }),
            text(`${Math.round(percent)}%`, {
              ...p,
              textAlign: "right",
              flexShrink: 0,
            }),
          ],
        }),
      )
    : emptyState;

  return container({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
    children: [
      text(title, h3),
      container({
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 8,
        },
        children: chartContent,
      }),
    ],
  });
}

export function wakatimeLanguagesChart(languages: WakatimeLanguages[]): Node {
  return wakatimeChart({
    key: "languages",
    section: languages.map(({ name, percent }) => ({ name, percent })),
  });
}

export function wakatimeCategoriesChart(categories: WakatimeLanguages[]): Node {
  return wakatimeChart({
    key: "categories",
    section: categories.map(({ name, percent }) => ({ name, percent })),
  });
}
