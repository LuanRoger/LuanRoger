import { container, text } from "@takumi-rs/helpers";
import { Module } from "./base";
import { debugContainer, h2, p } from "../utils/style";

export class GitHubModule extends Module {
  constructor() {
    super({
      name: "GitHub",
      description: "A module to show GitHub statistics.",
      width: 800,
      height: 300,
    });
  }

  generate() {
    return container({
      style: {
        ...this.sizeObject(),
        ...debugContainer,
      },
      children: [
        container({
          style: {
            display: "flex",
            flexDirection: "column",
          },
          children: [
            text(`Hello, World!`, h2),
            text(`Vamos criar algo legal`, p),
          ],
        }),
      ],
    });
  }
}
