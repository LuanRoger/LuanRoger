import { container, text } from "@takumi-rs/helpers";

export function generateGitHubProfile() {
  return container({
    style: {
      width: 800,
      height: 600,
      backgroundColor: 0x24292e,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    children: [
      text(`Hello, World!`, {
        fontSize: 48,
        color: 0xffffff,
      }),
    ],
  });
}
