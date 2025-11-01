import { GitHubModule, Module } from "metrics-modules/modules";

export function initModules(debug: boolean): Module[] {
  return [new GitHubModule(debug)];
}
