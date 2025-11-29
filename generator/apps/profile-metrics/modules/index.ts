import { IntroModule, Module } from "metrics-modules/modules";

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
];
