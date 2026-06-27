import { adaptOwnedGamesResponseToSteamGamesResponse } from "./adapters";

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
