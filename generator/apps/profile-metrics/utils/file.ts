export async function writeImageToFile(buffer: Uint8Array, filename: string) {
  await Bun.write(filename, buffer);
}

export function createFilePath(
  basePath: string,
  fileName: string,
  fileExtension: string
) {
  return `${basePath}/${fileName}.${fileExtension}`;
}
