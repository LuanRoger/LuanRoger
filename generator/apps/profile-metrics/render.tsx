import { renderer } from "metrics-modules";
import { modules } from "./modules";
import { createFilePath, writeImageToFile } from "./utils/file";

export async function render(basePath?: string) {
  const outputBasePath = basePath || "./";

  const promises = modules.map(async (module) => {
    const { module: moduleInstance, fileExtension, fileName } = module;

    const node = await moduleInstance.generate();
    const buffer = await renderer.render(node, {
      width: moduleInstance.width,
      height: moduleInstance.height,
      format: "png",
    });
    const fullFileName = createFilePath(
      outputBasePath,
      fileName,
      fileExtension
    );

    await writeImageToFile(buffer, fullFileName);
  });

  await Promise.all(promises);
}
