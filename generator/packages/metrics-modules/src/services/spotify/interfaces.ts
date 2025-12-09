export interface SpotifyTokenResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  scope: string;
}

export interface SpotifyTrackInfo {
  name: string;
  artists: string[];
  image: {
    url: string;
    height: number;
    width: number;
  };
}
