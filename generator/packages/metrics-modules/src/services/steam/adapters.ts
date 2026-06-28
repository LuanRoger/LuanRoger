import type {
  SteamGamesResponse,
  SteamPlayerStatsResponse,
  SteamGameSchemaResponse,
} from "./interfaces";

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

export function adaptPlayerStatsResponseToSteamPlayerStatsResponse(
  response: any,
): SteamPlayerStatsResponse {
  const innerResponse = response.playerstats;

  return {
    playerstats: {
      steamID: innerResponse.steamID,
      gameName: innerResponse.gameName,
      achievements: innerResponse.achievements.map((achievement: any) => ({
        apiname: achievement.apiname,
        achieved: achievement.achieved,
        unlocktime: achievement.unlocktime,
        name: achievement.name,
        description: achievement.description,
      })),
    },
  };
}

export function adaptGameSchemaResponseToSteamGameSchemaResponse(
  response: any,
): SteamGameSchemaResponse {
  const innerResponse = response.game;

  return {
    game: {
      gameName: innerResponse.gameName,
      gameVersion: innerResponse.gameVersion,
      availableGameStats: {
        stats: innerResponse.availableGameStats.stats.map((stat: any) => ({
          name: stat.name,
          defaultvalue: stat.defaultvalue,
          displayName: stat.displayName,
        })),
        achievements: innerResponse.availableGameStats.achievements.map(
          (achievement: any) => ({
            name: achievement.name,
            defaultvalue: achievement.defaultvalue,
            displayName: achievement.displayName,
            hidden: achievement.hidden,
            description: achievement.description,
            icon: achievement.icon,
            icongray: achievement.icongray,
          }),
        ),
      },
    },
  };
}
