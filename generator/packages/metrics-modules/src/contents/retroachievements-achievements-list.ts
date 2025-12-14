import { container, text } from "@takumi-rs/helpers";
import type { RetroachievementsAchievement } from "../services/retroachievements/interfaces";
import { image } from "./image";
import { bold, highlightForeground, p } from "../styles";

export async function retroachievementsAchievementsList(
  achievements: RetroachievementsAchievement[],
) {
  const achievementsListItemsPromises = achievements.map(
    async (achievement) => {
      const { title, description, badgeImageUrl } = achievement;
      console.log(achievement);

      return container({
        style: {
          display: "flex",
          gap: 10,
          marginLeft: 24,
        },
        children: [
          await image({
            src: badgeImageUrl,
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
              text(title, {
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
