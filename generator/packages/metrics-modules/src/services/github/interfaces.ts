export interface GitHubProfile {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  created_at: string;
  public_gists: number;
  public_repos: number;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  description: string | null;
  private: boolean;
  fork: boolean;
  size: number;
  stargazers_count: number;
}
