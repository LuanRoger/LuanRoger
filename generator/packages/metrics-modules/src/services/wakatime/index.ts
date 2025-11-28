import { adaptWakatimeResponseToWakatimeStats } from "./adapters";

export async function getWakatimeStats() {
  const wakatimeUrl = process.env.WAKATIME_URL;
  const wakatimeKey = process.env.WAKATIME_API_KEY;
  if (!wakatimeKey) {
    throw new Error(
      "GITHUB_METRIC_PAT is not defined in environment variables",
    );
  }

  const response = await fetch(`${wakatimeUrl}/users/current/stats`, {
    headers: {
      Authorization: `Basic ${wakatimeKey}`,
    },
  });
  if (!response.ok) {
    return;
  }

  const data = await response.json();
  const languageMetadataResponse = await getWakatimeLanguages();
  const statsData = adaptWakatimeResponseToWakatimeStats(
    data,
    languageMetadataResponse,
  );

  return statsData;
}

export async function getWakatimeLanguages() {
  const wakatimeUrl = process.env.WAKATIME_URL;
  const wakatimeKey = process.env.WAKATIME_API_KEY;
  if (!wakatimeUrl || !wakatimeKey) {
    return;
  }

  const response = await fetch(`${wakatimeUrl}/program_languages`, {
    headers: {
      Authorization: `Basic ${wakatimeKey}`,
    },
  });
  if (!response.ok) {
    return;
  }

  const { data } = (await response.json()) as any;

  return data;
}
