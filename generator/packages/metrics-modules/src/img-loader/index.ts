export function loadImage(src: string): Promise<Buffer> {
  if (typeof Bun !== "undefined") {
    return loadImageBun(src);
  }
  return loadImageNode(src);
}

async function loadImageBun(src: string): Promise<Buffer> {
  const githubProfilePic = Bun.file(src);
  const arrayBuffer = await githubProfilePic.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function loadImageNode(src: string): Promise<Buffer> {
  const fs = await import("node:fs/promises");
  const buffer = await fs.readFile(src);
  return buffer;
}
