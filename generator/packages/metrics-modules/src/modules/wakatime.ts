import { container, text } from "@takumi-rs/helpers";
import { Module } from ".";
import { h2, p } from "../utils/style";

export class WakatimeModule extends Module {
  constructor(debug: boolean = false) {
    super(
      {
        name: "Waktime",
        description: "A module to show Wakatime statistics.",
        width: 800,
        height: 300,
      },
      debug,
    );
  }

  override content() {
    return [
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
    ];
  }
}
