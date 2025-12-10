import { container, text } from "@takumi-rs/helpers";
import { getSpotifyRecentlyPlayed } from "../services/spotify";
import ErrorText from "../contents/error";
import { Module } from "./base";
import { h3 } from "../styles";
import { spotifyIcon } from "../icons";
import { spotifyTrackItem } from "../contents/spotify-track-item";

export class SpotifyModule extends Module {
  constructor(debug: boolean = false) {
    super(
      {
        name: "Spotify",
        description: "Show recently played songs from Spotify.",
        width: 600,
        height: 360,
      },
      debug,
    );
  }

  override async content() {
    const tracks = await getSpotifyRecentlyPlayed();

    if (tracks === undefined) {
      return [ErrorText()];
    }

    const last8Tracks = tracks.slice(0, 8);
    const tracksItemsPromises = last8Tracks.map((track) =>
      spotifyTrackItem(track),
    );
    const tracksItems = await Promise.all(tracksItemsPromises);

    return [
      container({
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 20,
        },
        children: [
          container({
            style: {
              display: "flex",
              alignItems: "center",
              gap: 10,
            },
            children: [
              await spotifyIcon(),
              text("Spotify recently played", h3),
            ],
          }),
          container({
            style: {
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 15,
            },
            children: tracksItems,
          }),
        ],
      }),
    ];
  }
}
