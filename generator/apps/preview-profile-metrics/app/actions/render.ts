"use server";

import { modulesTemplate } from "@/constants";
import { Renderer } from "@takumi-rs/core";

function createRender() {
  return new Renderer();
}

export async function renderModules() {
  const renderer = createRender();
  const node = modulesTemplate.githubProfile.generateNode();

  const buffer = await renderer.render(node, {
    width: 800,
    height: 600,
    format: "webp",
  });

  return buffer;
}
