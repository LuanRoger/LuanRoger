"use server";

import { Renderer } from "@takumi-rs/core";
import { GitHubModule } from "metrics-modules";

function createRender() {
  return new Renderer();
}

export async function renderModules() {
  const renderer = createRender();
  const githubModule = new GitHubModule();
  const node = githubModule.generate();

  const buffer = await renderer.render(node, {
    ...githubModule.sizeObject(),
    format: "webp",
  });

  return buffer;
}
