export interface RetroachievementsLastPlayedGame {
  gameId: number;
  consoleId: number;
  consoleName: string;
  title: string;
  imageIcon: string;
  imageTitle: string;
  imageIngame: string;
  imageBoxArt: string;
  lastPlayed: Date;
  achievementsTotal: number;
  numPossibleAchievements: number;
  possibleScore: number;
  numAchieved: number;
  scoreAchieved: number;
  numAchievedHardcore: number;
  scoreAchievedHardcore: number;
}

export interface RetroachievementsAchievement {
  id: number;
  title: string;
  description: string;
  points: number;
  badgeName: string;
  badgeImageUrl: string;
  dateEarned?: Date;
}

export interface RetroachievementsGameProgress {
  id: number;
  title: string;
  userCompletion: string;
  numAchievementsTotal: number;
  numAwardedToUser: number;
  achievements: RetroachievementsAchievement[];
}
