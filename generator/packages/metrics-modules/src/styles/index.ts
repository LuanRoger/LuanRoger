import type { PartialStyle } from "@takumi-rs/helpers";

export const center: PartialStyle = {
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

export const debugContainer: PartialStyle = {
  borderColor: "#FF0000",
  borderWidth: 2,
};

export const h1: PartialStyle = {
  fontSize: 48,
  fontWeight: "bold",
  color: "#0366d6",
};

export const h2: PartialStyle = {
  fontSize: 36,
  fontWeight: "bold",
  color: "#0366d6",
};

export const h3: PartialStyle = {
  fontSize: 24,
  fontWeight: "bold",
  color: "#0366d6",
};

export const p: PartialStyle = {
  fontSize: 16,
  color: "#666666",
};

export const errorForeground: PartialStyle = {
  color: "#FF0000",
};
