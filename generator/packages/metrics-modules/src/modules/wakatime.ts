import { container, text } from "@takumi-rs/helpers";
import { Module } from ".";
import { h3, p } from "@/styles";
import { getWakatimeAllTimeMetrics, getWakatimeStats } from "../services";
import ErrorText from "@/contents/error";
import {
  wakatimeIcon,
  historyIcon,
  codeIcon,
  terminalIcon,
  pulseIcon,
} from "../icons";
import iconLabel from "../contents/icon-label";
import {
  wakatimeCategoriesChart,
  wakatimeLanguagesChart,
} from "@/contents/wakatime-languages-chart";

export class WakatimeModule extends Module {
  constructor(debug: boolean = false) {
    super(
      {
        name: "Waktime",
        description: "A module to show Wakatime statistics.",
        width: 600,
        height: 350,
      },
      debug,
    );
  }

  override async content() {
    const stats = await getWakatimeStats();
    const allTimeStats = await getWakatimeAllTimeMetrics();
    if (!stats || !allTimeStats) {
      return [ErrorText()];
    }

    const { editors, avarengeText, languages, categories } = stats;
    const { totalSeconds } = allTimeStats;

    const mostUsedEditor = editors.sort((a, b) => a.percent - b.percent).pop();
    const mostUsedLanguage = Array.from(languages)
      .sort((a, b) => a.percent - b.percent)
      .pop();
    const allTimeCodingHours = Math.floor(totalSeconds / 3600);

    return [
      container({
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 20,
        },
        children: [
          iconLabel({
            icon: await wakatimeIcon(),
            label: text("Wakatime (over last week)", h3),
          }),
          container({
            children: [
              iconLabel({
                icon: await historyIcon(),
                label: text(`~${allTimeCodingHours} coding hours recorded`, p),
              }),
              iconLabel({
                icon: await terminalIcon(),
                label: text(`Coding with ${mostUsedEditor?.name}`, p),
              }),
              iconLabel({
                icon: await pulseIcon(),
                label: text(`~${avarengeText} of coding per day`, p),
              }),
              iconLabel({
                icon: await codeIcon(),
                label: text(`Mostly coding in ${mostUsedLanguage?.name}`, p),
              }),
            ],
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
            },
          }),
          container({
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
            },
            children: [
              wakatimeLanguagesChart(languages),
              wakatimeCategoriesChart(categories),
            ],
          }),
        ],
      }),
    ];
  }
}
