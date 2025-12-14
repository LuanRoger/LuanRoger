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
  const flatAchievements = Object.entries(response.Achievements)
    .filter(([key, value]: [string, any]) => !!value.DateEarned)
    .reduce(
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
          badgeImageUrl: `${retroachievementsMediaUrl}/Badge/${value.BadgeName}.png`,
          dateEarned: new Date(value.DateEarned + " UTC"),
        };

        return acc;
      },
      {} as { [key: string]: RetroachievementsAchievement },
    );

  const sortedAchievementsKeys = Object.values(flatAchievements).sort(
    (a, b) => (b.dateEarned?.getTime() ?? 0) - (a.dateEarned?.getTime() ?? 0),
  );

  return {
    id: response.ID,
    title: response.Title,
    userCompletion: response.UserCompletion,
    numAchievementsTotal: response.NumAchievements,
    numAwardedToUser: response.NumAwardedToUser,
    achievements: sortedAchievementsKeys,
  };
}
