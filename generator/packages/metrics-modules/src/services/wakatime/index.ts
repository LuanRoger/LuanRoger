import { adaptWakatimeAllTimeResponseToWakatimeAllTime, adaptWakatimeResponseToWakatimeStats } from "./adapters";

export async function getWakatimeStats() {
  const wakatimeUrl = process.env.WAKATIME_URL;
  const wakatimeKey = process.env.WAKATIME_API_KEY;
  if (!wakatimeKey || !wakatimeUrl) {
    throw new Error(
      "WAKATIME_API_KEY or WAKATIME_URL is not defined in environment variables",
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
  if (!wakatimeKey || !wakatimeUrl) {
    throw new Error(
      "WAKATIME_API_KEY or WAKATIME_URL is not defined in environment variables",
    );
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

export async function getWakatimeAllTimeMetrics() {
  const wakatimeUrl = process.env.WAKATIME_URL;
  const wakatimeKey = process.env.WAKATIME_API_KEY;
  if (!wakatimeKey || !wakatimeUrl) {
    throw new Error(
      "WAKATIME_API_KEY or WAKATIME_URL is not defined in environment variables",
    );
  }

  const response = await fetch(
    `${wakatimeUrl}/users/current/all_time_since_today`,
    {
      headers: {
        Authorization: `Basic ${wakatimeKey}`,
      },
    },
  );
  if (!response.ok) {
    return;
  }

  const data = await response.json();
  const metricsData = adaptWakatimeAllTimeResponseToWakatimeAllTime(data);

  return metricsData;
}
