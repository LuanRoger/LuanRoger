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
