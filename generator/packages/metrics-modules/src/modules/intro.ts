import { text } from "@takumi-rs/helpers";
import { Module } from "./base";

export class IntroModule extends Module {
  constructor(debug: boolean = false) {
    super({
      name: "Intro",
      description: "A module to introduce myself",
      width: 800,
      height: 300,
    }, debug);
  }

  override content() {
    return [
      text(`Hello, I'm Luan Roger!`, {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
      }),
    ];
  }
}
