import { container, text } from "takumi-js/helpers";
import type { SteamPlayerAchievement } from "../services/steam/interfaces";
import { image } from "./image";
import { bold, highlightForeground, p } from "../styles";

export async function steamAchievementsList(
  achievements: {
    achievement: SteamPlayerAchievement;
    icon: string;
  }[],
) {
  const achievementsListItemsPromises = achievements.map(
    async (achievement) => {
      const { achievement: innerAchievement, icon } = achievement;
      const { name, description } = innerAchievement;

      return container({
        style: {
          display: "flex",
          gap: 10,
          marginLeft: 24,
        },
        children: [
          await image({
            src: icon,
            style: {
              width: "54px",
              height: "54px",
              borderRadius: "8px",
            },
          }),
          container({
            style: {
              display: "flex",
              flexDirection: "column",
              gap: 4,
            },
            children: [
              text(name, {
                ...p,
                ...highlightForeground,
                ...bold,
              }),
              text(description, p),
            ],
          }),
        ],
      });
    },
  );

  const achievementsListItems = await Promise.all(
    achievementsListItemsPromises,
  );

  return container({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
    },
    children: achievementsListItems,
  });
}
