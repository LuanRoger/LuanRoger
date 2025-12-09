import {
  DumyModule,
  IntroModule,
  Module,
  SpotifyModule,
  WakatimeModule,
} from "metrics-modules/modules";

export function initModules(debug: boolean): Module[] {
  return [
    new IntroModule(debug),
    new WakatimeModule(debug),
    new SpotifyModule(debug),
    new DumyModule(debug),
  ];
}
