import ky from "ky";
import type { GitHubProfile, GitHubRepository } from "./interfaces";

const githubApiClient = ky.create({
  prefixUrl: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
  },
});

export async function getGitHubProfile() {
  const githubPat = process.env.GITHUB_METRIC_PAT;
  if (!githubPat) {
    throw new Error(
      "GITHUB_METRIC_PAT is not defined in environment variables"
    );
  }

  const response = await githubApiClient
    .get<GitHubProfile>("user", {
      headers: {
        Authorization: `Bearer ${githubPat}`,
      },
    })
    .json();

  return response;
}

export async function getGitHubRepos() {
  const githubPat = process.env.GITHUB_METRIC_PAT;
  if (!githubPat) {
    throw new Error(
      "GITHUB_METRIC_PAT is not defined in environment variables"
    );
  }

  const response = await githubApiClient
    .get<GitHubRepository[]>("user/repos?sort=updated&per_page=100", {
      headers: {
        Authorization: `Bearer ${githubPat}`,
      },
      searchParams: {
        per_page: "100",
        sort: "updated",
      },
    })
    .json();

  return response;
}
