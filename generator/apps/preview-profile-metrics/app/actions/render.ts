"use server";

import { initModules } from "@/modules";
import { RenderResult } from "@/types/render-result";
import { renderer } from "metrics-modules";

export async function renderModules(debug: boolean = false): Promise<RenderResult[]> {
  const modules = initModules(debug);
  const bufferPromises = modules.map(async (module) => {
    const node = module.generate();

    const buffer = await renderer.render(node, {
      ...module.sizeObject(),
      format: "webp",
    });

    return {
      metadata: module.metadata,
      buffer,
    };
  });

  const results = await Promise.all(bufferPromises);
  return results;
}
