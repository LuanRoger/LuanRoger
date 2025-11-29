import { DumyModule, IntroModule, Module, WakatimeModule } from "metrics-modules/modules";

export function initModules(debug: boolean): Module[] {
  return [new IntroModule(debug), new WakatimeModule(debug), new DumyModule(debug)];
}
