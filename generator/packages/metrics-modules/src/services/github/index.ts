import ky from "ky";
import type {
  GitHubProfile,
  GitHubRepository,
  GitHubSearchResponse,
} from "./interfaces";

const githubApiClient = ky.create({
  prefix: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
  },
});

export async function getGitHubProfile() {
  const githubPat = process.env.GH_METRIC_PAT;
  if (!githubPat) {
    throw new Error("GH_METRIC_PAT is not defined in environment variables");
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
  const githubPat = process.env.GH_METRIC_PAT;
  if (!githubPat) {
    throw new Error("GH_METRIC_PAT is not defined in environment variables");
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

export async function getOpenIssues() {
  const githubPat = process.env.GH_METRIC_PAT;
  const githubUsername = process.env.GH_USERNAME;

  if (!githubPat || !githubUsername) {
    throw new Error("GH_METRIC_PAT is not defined in environment variables");
  }

  const response = await githubApiClient
    .get<GitHubSearchResponse>(
      `search/issues?q=is:issue+is:open+author:${githubUsername}&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${githubPat}`,
        },
      },
    )
    .json();

  return response;
}

export async function getDraftIssues() {
  const githubPat = process.env.GH_METRIC_PAT;
  const githubUsername = process.env.GH_USERNAME;

  if (!githubPat || !githubUsername) {
    throw new Error("GH_METRIC_PAT is not defined in environment variables");
  }

  const response = await githubApiClient
    .get<GitHubSearchResponse>(
      `search/issues?q=is:draft+author:${githubUsername}&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${githubPat}`,
        },
      },
    )
    .json();

  return response;
}

export async function getCloseIssues() {
  const githubPat = process.env.GH_METRIC_PAT;
  const githubUsername = process.env.GH_USERNAME;

  if (!githubPat || !githubUsername) {
    throw new Error("GH_METRIC_PAT is not defined in environment variables");
  }

  const response = await githubApiClient
    .get<GitHubSearchResponse>(
      `search/issues?q=is:issue+is:closed+author:${githubUsername}&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${githubPat}`,
        },
      },
    )
    .json();

  return response;
}

export async function getOpenPullRequests() {
  const githubPat = process.env.GH_METRIC_PAT;
  const githubUsername = process.env.GH_USERNAME;

  if (!githubPat || !githubUsername) {
    throw new Error("GH_METRIC_PAT is not defined in environment variables");
  }

  const response = await githubApiClient
    .get<GitHubSearchResponse>(
      `search/issues?q=is:pr+is:open+author:${githubUsername}&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${githubPat}`,
        },
      },
    )
    .json();

  return response;
}

export async function getMergedPullRequests() {
  const githubPat = process.env.GH_METRIC_PAT;
  const githubUsername = process.env.GH_USERNAME;

  if (!githubPat || !githubUsername) {
    throw new Error("GH_METRIC_PAT is not defined in environment variables");
  }

  const response = await githubApiClient
    .get<GitHubSearchResponse>(
      `search/issues?q=is:pr+is:merged+author:${githubUsername}&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${githubPat}`,
        },
      },
    )
    .json();

  return response;
}

export async function getDraftPullRequests() {
  const githubPat = process.env.GH_METRIC_PAT;
  const githubUsername = process.env.GH_USERNAME;

  if (!githubPat || !githubUsername) {
    throw new Error("GH_METRIC_PAT is not defined in environment variables");
  }

  const response = await githubApiClient
    .get<GitHubSearchResponse>(
      `search/issues?q=is:pr+is:draft+author:${githubUsername}&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${githubPat}`,
        },
      },
    )
    .json();

  return response;
}

export async function getClosedPullRequests() {
  const githubPat = process.env.GH_METRIC_PAT;
  const githubUsername = process.env.GH_USERNAME;

  if (!githubPat || !githubUsername) {
    throw new Error("GH_METRIC_PAT is not defined in environment variables");
  }

  const response = await githubApiClient
    .get<GitHubSearchResponse>(
      `search/issues?q=is:pr+is:closed+author:${githubUsername}&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${githubPat}`,
        },
      },
    )
    .json();

  return response;
}
