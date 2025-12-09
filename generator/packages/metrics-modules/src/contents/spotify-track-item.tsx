import { container, image, text } from "@takumi-rs/helpers";
import type { SpotifyTrackInfo } from "../services/spotify/interfaces";
import { p, small } from "../styles";

export function spotifyTrackItem(item: SpotifyTrackInfo) {
  const { name, image: imageInfo, artists } = item;
  const { url, height, width } = imageInfo;

  const artistsNames = artists.join(", ");

  return container({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
    children: [
      container({
        style: {
          display: "flex",
          alignItems: "center",
          gap: 15,
        },
        children: [
          image({
            src: url,
            width,
            height,
          }),
          container({
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 5,
            },
            children: [
              text(name, {
                ...p,
                fontWeight: "bold",
              }),
              text(artistsNames, small),
            ],
          }),
        ],
      }),
    ],
  });
}
