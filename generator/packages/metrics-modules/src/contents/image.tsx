import { fromJsx } from "@takumi-rs/helpers/jsx";
import type { CSSProperties } from "react";

async function fetchImageAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64");

  const contentType = response.headers.get("content-type") || "image/jpeg";
  return `data:${contentType};base64,${base64}`;
}

function isExternalUrl(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}

interface ImageProps {
  src: string;
  width?: number;
  height?: number;
  style?: CSSProperties;
}

export async function image({ src, ...props }: ImageProps) {
  const imageSrc = isExternalUrl(src) ? await fetchImageAsBase64(src) : src;
  const imageElement = <img src={imageSrc} {...props} />;

  return fromJsx(imageElement);
}
