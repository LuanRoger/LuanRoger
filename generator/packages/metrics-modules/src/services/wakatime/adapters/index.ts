import type {
  WakatimeAllTimeMetrics,
  WakatimeEditor,
  WakatimeLanguageMetadata,
  WakatimeStats,
} from "../interfaces";

export function adaptWakatimeResponseToWakatimeStats(
  model: any,
  langaugeMetadata?: WakatimeLanguageMetadata[],
): WakatimeStats {
  if (!model || typeof model !== "object") {
    throw new Error("Invalid model: expected an object");
  }
  const data = model.data;

  const categories = data.categories.map((category: any) => ({
    totalSeconds: category.total_seconds,
    name: category.name,
    percent: category.percent,
    text: category.text,
    hours: category.hours,
    minutes: category.minutes,
  }));

  const editors: WakatimeEditor[] = data.editors.map((editor: any) => ({
    totalSeconds: editor.total_seconds,
    name: editor.name,
    percent: editor.percent,
    text: editor.text,
    hours: editor.hours,
    minutes: editor.minutes,
  }));

  const languages = data.languages.map((language: any) => {
    const metadata = langaugeMetadata?.find(
      (lang) => lang.name === language.name,
    );

    return {
      name: language.name,
      totalSeconds: language.total_seconds,
      percent: language.percent,
      text: language.text,
      hours: language.hours,
      minutes: language.minutes,
      metadata,
    };
  });

  return {
    status: data.status,
    totalText: data.human_readable_total_including_other_language,
    avarengeText: data.human_readable_daily_average_including_other_language,
    totalInSeconds: data.total_seconds,
    categories,
    editors,
    languages,
  };
}

export function adaptWakatimeAllTimeResponseToWakatimeAllTime(
  model: any,
): WakatimeAllTimeMetrics {
  if (!model || typeof model !== "object") {
    throw new Error("Invalid model: expected an object");
  }

  const data = model.data;

  return {
    totalSeconds: data.total_seconds,
    text: data.text,
  };
}
