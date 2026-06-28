import { container, text } from "takumi-js/helpers";
import ErrorText from "../contents/error";
import { Module } from "./base";
import { h1, h3, h4, p } from "../styles";
import {
  getGameAchievements,
  getGameIconImage,
  getGameSchema,
  getLastPlayedGame,
} from "../services/steam";
import iconLabel from "../contents/icon-label";
import { steamIcon } from "../icons/steam";
import { image } from "../contents/image";
import { trophyIcon } from "../icons/trophy";
import type { SteamPlayerAchievement } from "../services/steam/interfaces";
import { steamAchievementsList } from "../contents/steam-achievements";
import { historyIcon } from "../icons";

export class SteamModule extends Module {
  constructor(debug: boolean = false) {
    super(
      {
        name: "Steam",
        description: "Show the achievemnts of the last played game.",
        width: 800,
        height: 460,
      },
      debug,
    );
  }

  override async content() {
    const lastPlayedGame = await getLastPlayedGame();

    if (!lastPlayedGame) {
      return [ErrorText()];
    }

    const { appId, name, imgIconUrl, playtimeForever } = lastPlayedGame;
    const gameIcon = getGameIconImage(appId, imgIconUrl);

    const achievementsPromise = getGameAchievements(appId);
    const gameSchemaPromise = getGameSchema(appId);
    const [achievements, gameSchema] = await Promise.all([
      achievementsPromise,
      gameSchemaPromise,
    ]);

    const playtimeInHours = Math.ceil(playtimeForever / 60);
    const totalAchievements = achievements.length;
    const unlockedAchievements = achievements
      .filter((achievement) => achievement.achieved)
      .sort((first, second) => second.unlocktime - first.unlocktime);
    const totalUnlockedAchievements = unlockedAchievements.length;

    const last4Achievements = unlockedAchievements.slice(0, 4);
    const last4AchievementsApiName = last4Achievements.map(
      (achievement) => achievement.apiname,
    );
    const last4AchievementsIcon =
      gameSchema.game.availableGameStats.achievements
        .filter((achievement) =>
          last4AchievementsApiName.includes(achievement.name),
        )
        .map((achievement) => ({
          name: achievement.name,
          icon: achievement.icon,
        }));

    const achievementsIconsMap = last4Achievements.reduce(
      (acc, achievement) => {
        const achievementApiName = achievement.apiname;
        const achievementIconIndex = last4AchievementsIcon.findIndex(
          (icon) => icon.name === achievementApiName,
        );
        const achievementIcon =
          last4AchievementsIcon[achievementIconIndex]?.icon;
        if (!achievementIcon) {
          throw new Error(
            `Achievement icon not found for ${achievementApiName}`,
          );
        }

        acc[achievementApiName] = {
          achievement,
          icon: achievementIcon,
        };

        return acc;
      },
      {} as {
        [apiName: string]: {
          achievement: SteamPlayerAchievement;
          icon: string;
        };
      },
    );
    const achievementsIcons = Object.values(achievementsIconsMap);

    return [
      container({
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 20,
        },
        children: [
          iconLabel({
            icon: await steamIcon(),
            label: text("Steam", h3),
          }),
          iconLabel({
            icon: await image({
              src: gameIcon,
              style: {
                width: "54px",
                height: "54px",
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
                text(name, h4),
                iconLabel({
                  icon: await trophyIcon(),
                  label: text(
                    `${totalUnlockedAchievements}/${totalAchievements} achievements unlocked`,
                    p,
                  ),
                }),
                iconLabel({
                  icon: await historyIcon(),
                  label: text(`${playtimeInHours} hours played`, p),
                }),
              ],
            }),
            style: {
              display: "flex",
              flexDirection: "row",
              gap: 8,
            },
          }),
          await steamAchievementsList(achievementsIcons),
        ],
      }),
    ];
  }
}
