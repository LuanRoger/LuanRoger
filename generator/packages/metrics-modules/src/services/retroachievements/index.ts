import {
  adaptGameProgressResponseToGameProgress,
  adaptLastPlayedGameResponseToLastPlayedGame,
} from "./adapters";

export async function getLastPlayedGame() {
  const baseUrl = process.env.RETROACHIEVEMENTS_BASE_URL;
  const apiUrl = process.env.RETROACHIEVEMENTS_API_URL;
  const apiKey = process.env.RETROACHIEVEMENTS_API_KEY;
  const username = process.env.RETROACHIEVEMENTS_USERNAME;

  if (!baseUrl || !apiUrl || !apiKey || !username) {
    throw new Error("Retroachievements environment variables are not set");
  }

  const result = await fetch(
    `${apiUrl}/API_GetUserRecentlyPlayedGames.php?u=${username}&y=${apiKey}&c=1`,
    {
      method: "GET",
    },
  );

  const response = await result.json();

  return adaptLastPlayedGameResponseToLastPlayedGame(response, baseUrl);
}

export async function getGameProgress(gameId: number) {
  const apiUrl = process.env.RETROACHIEVEMENTS_API_URL;
  const mediaUrl = process.env.RETROACHIEVEMENTS_MEDIA_URL;
  const apiKey = process.env.RETROACHIEVEMENTS_API_KEY;
  const username = process.env.RETROACHIEVEMENTS_USERNAME;

  if (!apiUrl || !mediaUrl || !apiKey || !username) {
    throw new Error("Retroachievements environment variables are not set");
  }

  const result = await fetch(
    `${apiUrl}/API_GetGameInfoAndUserProgress.php?u=${username}&y=${apiKey}&g=${gameId}`,
    {
      method: "GET",
    },
  );

  const response = await result.json();

  return adaptGameProgressResponseToGameProgress(response, mediaUrl);
}
