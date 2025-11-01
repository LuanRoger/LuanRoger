import { container, image, text } from "@takumi-rs/helpers";
import { Module } from "./base";
import { h1 } from "../utils/style";

export class IntroModule extends Module {
  constructor(debug: boolean = false) {
    super(
      {
        name: "Intro",
        description: "A module to introduce myself",
        width: 800,
        height: 300,
      },
      debug
    );
  }

  override content() {
    return [
      container({
        children: [
          image({
            src: "github-profile.jpg",
            height: 200,
            width: 200,
            style: {
              borderRadius: 999,
              width: 100,
              height: 100,
            },
          }),
          container({
            children: [text("Luan Roger", h1)],
          }),
        ],
        style: {
          flexDirection: "row",
          gap: 20,
        },
      }),
    ];
  }
}
