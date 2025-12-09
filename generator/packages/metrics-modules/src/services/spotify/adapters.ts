import type { SpotifyTokenResponse, SpotifyTrackInfo } from "./interfaces";

export function adaptSpotifyTokenResponse(model: any): SpotifyTokenResponse {
  return {
    accessToken: model.access_token,
    tokenType: model.token_type,
    expiresIn: model.expires_in,
    scope: model.scope,
  };
}

export function adaptRecentlyPlayedTrackResponseToSpotifyTrackingInfo(
  model: any,
): SpotifyTrackInfo[] {
  if (!model || typeof model !== "object") {
    throw new Error("Invalid model: expected an object");
  }

  const items = model.items;
  if (!Array.isArray(items)) {
    throw new Error("Invalid model: expected items to be an array");
  }

  return items.map((item: any) => {
    const track = item.track;
    const image = track.album.images[0];
    const name = track.name;
    const artists = track.artists.map((artist: any) => artist.name);

    return {
      name,
      artists,
      image: {
        url: image.url,
        height: image.height,
        width: image.width,
      },
    };
  });
}
