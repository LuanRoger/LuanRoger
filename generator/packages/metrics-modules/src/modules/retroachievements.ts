import { container, text } from "@takumi-rs/helpers";
import {
  getGameProgress,
  getLastPlayedGame,
} from "../services/retroachievements";
import { Module } from ".";
import iconLabel from "../contents/icon-label";
import { h3, h4, p } from "../styles";
import { retroachievementsIcon } from "../icons/retroachievements";
import { image } from "../contents/image";
import { trophyIcon } from "../icons/trophy";
import { goalIcon } from "../icons/goal";
import { retroachievementsAchievementsList } from "../contents/retroachievements-achievements-list";

export class RetroAchievementsModule extends Module {
  constructor(debug: boolean) {
    super(
      {
        name: "RetroAchievements",
        description: "Show RetroAchievements stats.",
        width: 600,
        height: 460,
      },
      debug,
    );
  }

  override async content() {
    const {
      gameId,
      title: gameTitle,
      consoleName,
      imageIcon,
    } = await getLastPlayedGame();
    const {
      achievements,
      numAwardedToUser,
      numAchievementsTotal,
      userCompletion,
    } = await getGameProgress(gameId);

    const last4Achievements = achievements.slice(0, 4);

    return [
      container({
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 20,
        },
        children: [
          iconLabel({
            icon: await retroachievementsIcon(),
            label: text("RetroAchievements", h3),
          }),
          iconLabel({
            icon: await image({
              src: imageIcon,
              style: {
                width: "64px",
                height: "64px",
                borderRadius: "8px",
              },
            }),
            label: container({
              style: {
                display: "flex",
                flexDirection: "column",
                gap: 4,
              },
              children: [
                text(gameTitle, h4),
                text(consoleName, p),
                iconLabel({
                  icon: await trophyIcon({
                    width: "18px",
                    height: "18px",
                  }),
                  label: text(
                    `${numAwardedToUser}/${numAchievementsTotal} achievements unlocked`,
                    p,
                  ),
                }),
                iconLabel({
                  icon: await goalIcon({
                    width: "18px",
                    height: "18px",
                  }),
                  label: text(`${userCompletion}% completion`, p),
                }),
              ],
            }),
            style: {
              display: "flex",
              flexDirection: "row",
              gap: 8,
            },
          }),
          await retroachievementsAchievementsList(last4Achievements),
        ],
      }),
    ];
  }
}
