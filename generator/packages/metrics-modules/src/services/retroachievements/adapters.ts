import type {
  RetroachievementsAchievement,
  RetroachievementsGameProgress,
  RetroachievementsLastPlayedGame,
} from "./interfaces";

export function adaptLastPlayedGameResponseToLastPlayedGame(
  response: any,
  retroachievementsBaseUrl: string,
): RetroachievementsLastPlayedGame {
  const lastGame = response[0];

  return {
    gameId: lastGame.GameID,
    consoleId: lastGame.ConsoleID,
    consoleName: lastGame.ConsoleName,
    title: lastGame.Title,
    imageIcon: `${retroachievementsBaseUrl}${lastGame.ImageIcon}`,
    imageTitle: `${retroachievementsBaseUrl}${lastGame.ImageTitle}`,
    imageIngame: `${retroachievementsBaseUrl}${lastGame.ImageIngame}`,
    imageBoxArt: `${retroachievementsBaseUrl}${lastGame.ImageBoxArt}`,
    lastPlayed: new Date(lastGame.LastPlayed + " UTC"),
    achievementsTotal: lastGame.AchievementsTotal,
    numPossibleAchievements: lastGame.NumPossibleAchievements,
    possibleScore: lastGame.PossibleScore,
    numAchieved: lastGame.NumAchieved,
    scoreAchieved: lastGame.ScoreAchieved,
    numAchievedHardcore: lastGame.NumAchievedHardcore,
    scoreAchievedHardcore: lastGame.ScoreAchievedHardcore,
  };
}

export function adaptGameProgressResponseToGameProgress(
  response: any,
  retroachievementsMediaUrl: string,
): RetroachievementsGameProgress {
  const flatAchievements = Object.entries(response.Achievements).reduce(
    (
      acc: { [key: string]: RetroachievementsAchievement },
      [key, value]: [string, any],
    ) => {
      acc[key] = {
        id: value.ID,
        title: value.Title,
        description: value.Description,
        points: value.Points,
        badgeName: value.BadgeName,
        badgeImageUrl: `${retroachievementsMediaUrl}/Badge/${value.ID}.png`,
      };

      return acc;
    },
    {} as { [key: string]: RetroachievementsAchievement },
  );

  return {
    id: response.ID,
    title: response.Title,
    userCompletion: response.UserCompletion,
    numAchievementsTotal: response.NumAchievementsTotal,
    numAwardedToUser: response.NumAwardedToUser,
    achievements: flatAchievements,
  };
}
