import { GitHubModule, IntroModule, Module } from "metrics-modules/modules";

export function initModules(debug: boolean): Module[] {
  return [new IntroModule(debug), new GitHubModule(debug)];
}
