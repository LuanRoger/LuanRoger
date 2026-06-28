export interface SteamGame {
  appId: number;
  name: string;
  playtimeForever: number;
  imgIconUrl: string;
  hasCommunityVisibleStats: boolean;
  playtimeWindowsForever: number;
  playtimeMacForever: number;
  playtimeLinuxForever: number;
  playtimeDeckForever: number;
  rtimeLastPlayed: number;
  contentDescriptorIds: number[];
  playtimeDisconnected: number;
}

export interface SteamGamesResponse {
  gameCount: number;
  games: SteamGame[];
}

export interface SteamPlayerAchievement {
  apiname: string;
  achieved: number;
  unlocktime: number;
  name: string;
  description: string;
}

export interface SteamPlayerStats {
  steamID: string;
  gameName: string;
  achievements: SteamPlayerAchievement[];
}

export interface SteamPlayerStatsResponse {
  playerstats: SteamPlayerStats;
}

export interface SteamGameStat {
  name: string;
  defaultvalue: number;
  displayName: string;
}

export interface SteamGameAchievement {
  name: string;
  defaultvalue: number;
  displayName: string;
  hidden: number;
  description: string;
  icon: string;
  icongray: string;
}

export interface SteamAvailableGameStats {
  stats: SteamGameStat[];
  achievements: SteamGameAchievement[];
}

export interface SteamGameSchema {
  gameName: string;
  gameVersion: string;
  availableGameStats: SteamAvailableGameStats;
}

export interface SteamGameSchemaResponse {
  game: SteamGameSchema;
}
