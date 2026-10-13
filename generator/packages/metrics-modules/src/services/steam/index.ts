import {
  adaptGameSchemaResponseToSteamGameSchemaResponse,
  adaptOwnedGamesResponseToSteamGamesResponse,
  adaptPlayerStatsResponseToSteamPlayerStatsResponse,
} from "./adapters";

export async function getSteamGames() {
  const apiKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_ID;
  const baseUrl = process.env.STEAM_BASE_URL;

  const url = `${baseUrl}/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&include_appinfo=1&format=json`;

  const response = await fetch(url);
  const jsonResponse = await response.json();
  return adaptOwnedGamesResponseToSteamGamesResponse(jsonResponse);
}

export async function getLastPlayedGame() {
  const { games } = await getSteamGames();
  const sortedGames = games.sort(
    (first, second) => second.rtimeLastPlayed - first.rtimeLastPlayed,
  );

  const lastPlayedGame = sortedGames[0];
  return lastPlayedGame;
}

export async function getGameAchievements(appId: number) {
  const baseUrl = process.env.STEAM_BASE_URL;
  const apiKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_ID;

  const url = `${baseUrl}/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${apiKey}&steamid=${steamId}&format=json&l=en`;

  const response = await fetch(url);
  const jsonResponse = await response.json();

  const { playerstats } =
    adaptPlayerStatsResponseToSteamPlayerStatsResponse(jsonResponse);
  return playerstats.achievements;
}

export async function getGameSchema(appId: number) {
  const baseUrl = process.env.STEAM_BASE_URL;
  const apiKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_ID;

  const url = `${baseUrl}/ISteamUserStats/GetSchemaForGame/v0002/?key=${apiKey}&steamid=${steamId}&appid=${appId}&l=en&format=json`;

  const response = await fetch(url);
  const jsonResponse = await response.json();

  return adaptGameSchemaResponseToSteamGameSchemaResponse(jsonResponse);
}

export function getGameIconImage(appId: number, imgIconUrl: string) {
  const baseUrl = process.env.STEAM_MEDIA_BASE_URL;

  return `${baseUrl}/steamcommunity/public/images/apps/${appId}/${imgIconUrl}.jpg`;
}
