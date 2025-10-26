import { Renderer } from "@takumi-rs/core";
import { GitHub } from "metrics-modules";

const renderer = new Renderer({});

async function writeImageToFile(buffer: Uint8Array, filename: string) {
  await Bun.write(filename, buffer);
}

export async function render() {
  const githubNode = GitHub.generateGitHubProfile();

  const imageBuffer = await renderer.render(githubNode, {
    width: 1000,
    height: 800,
    format: "png",
  });
  await writeImageToFile(imageBuffer, "github-profile.png");
}
