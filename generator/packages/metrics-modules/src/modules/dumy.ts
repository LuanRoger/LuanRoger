import { container, text } from "@takumi-rs/helpers";
import { Module } from "./base";
import { h2, p } from "@/styles";

export class DumyModule extends Module {
  constructor(debug: boolean = false) {
    super(
      {
        name: "Dumy",
        description: "A module to show dumy content.",
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
