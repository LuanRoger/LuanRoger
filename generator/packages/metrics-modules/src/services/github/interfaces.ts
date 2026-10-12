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

export interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
}

export interface GitHubIssueSubIssuesSummary {
  total: number;
  completed: number;
  percent_completed: number;
}

export interface GitHubIssueDependenciesSummary {
  blocked_by: number;
  total_blocked_by: number;
  blocking: number;
  total_blocking: number;
}

export interface GitHubIssueReactions {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export interface GitHubIssue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: GitHubUser;
  labels: any[];
  state: string;
  locked: boolean;
  assignees: any[];
  milestone: any | null;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  assignee: any | null;
  author_association: string;
  active_lock_reason: string | null;
  sub_issues_summary: GitHubIssueSubIssuesSummary;
  issue_dependencies_summary: GitHubIssueDependenciesSummary;
  body: string;
  reactions: GitHubIssueReactions;
  timeline_url: string;
  performed_via_github_app: any | null;
  state_reason: string | null;
  pinned_comment: any | null;
  score: number;
}

export interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubIssue[];
}
