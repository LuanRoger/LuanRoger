import {
  DumyModule,
  IntroModule,
  Module,
  RetroAchievementsModule,
  SteamModule,
  SpotifyModule,
  WakatimeModule,
} from "metrics-modules/modules";

export function initModules(debug: boolean): Module[] {
  return [
    new IntroModule(debug),
    new WakatimeModule(debug),
    new SpotifyModule(debug),
    new RetroAchievementsModule(debug),
    new SteamModule(debug),
    new DumyModule(debug),
  ];
}
