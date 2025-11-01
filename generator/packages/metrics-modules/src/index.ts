import { Renderer } from "@takumi-rs/core";
import { loadImage } from "./img-loader";

export const renderer = new Renderer({
  persistentImages: [
    {
      src: "github-profile.jpg",
      data: await loadImage("./public/github-profile.jpg"),
    },
  ],
});
