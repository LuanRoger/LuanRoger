import { IntroModule, Module, SpotifyModule, WakatimeModule } from "metrics-modules/modules";

export interface ModuleGenerationData {
  fileName: string;
  fileExtension: string;
  module: Module;
}

export const modules: ModuleGenerationData[] = [
  {
    fileName: "intro",
    fileExtension: "png",
    module: new IntroModule(),
  },
  {
    fileName: "wakatime",
    fileExtension: "png",
    module: new WakatimeModule(),
  },
  {
    fileName: "spotify",
    fileExtension: "png",
    module: new SpotifyModule()
  }
];
