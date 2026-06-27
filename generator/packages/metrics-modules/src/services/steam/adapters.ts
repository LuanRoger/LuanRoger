import type { SteamGamesResponse } from "./interfaces";

export function adaptOwnedGamesResponseToSteamGamesResponse(
  response: any,
): SteamGamesResponse {
  const innerResponse = response.response;

  return {
    gameCount: innerResponse.game_count,
    games: innerResponse.games.map((game: any) => ({
      appId: game.appid,
      name: game.name,
      playtimeForever: game.playtime_forever,
      imgIconUrl: game.img_icon_url,
      hasCommunityVisibleStats: game.has_community_visible_stats,
      playtimeWindowsForever: game.playtime_windows_forever,
      playtimeMacForever: game.playtime_mac_forever,
      playtimeLinuxForever: game.playtime_linux_forever,
      playtimeDeckForever: game.playtime_deck_forever,
      rtimeLastPlayed: game.rtime_last_played,
      contentDescriptorIds: game.content_descriptorids,
      playtimeDisconnected: game.playtime_disconnected,
    })),
  };
}
