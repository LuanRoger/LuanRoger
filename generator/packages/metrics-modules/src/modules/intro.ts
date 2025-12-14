import { container, text } from "@takumi-rs/helpers";
import { Module } from "./base";
import { h1, p } from "@/styles";
import { getGitHubProfile, getGitHubRepos } from "../services";
import { usersIcon, repositoryIcon, codeIcon, starIcon } from "../icons";
import iconLabel from "../contents/icon-label";
import { image } from "../contents/image";

export class IntroModule extends Module {
  constructor(debug: boolean = false) {
    super(
      {
        name: "Intro",
        description: "A module to introduce my GitHub profile.",
        width: 450,
        height: 200,
      },
      debug,
    );
  }

  override async content() {
    const { name, login, followers, created_at, public_gists, public_repos } =
      await getGitHubProfile();
    const repositories = await getGitHubRepos();

    const formatedDate = new Date(created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const yearsSinceCreation =
      new Date().getFullYear() - new Date(created_at).getFullYear();
    const stargazersCount = repositories.reduce(
      (acc, repo) => acc + repo.stargazers_count,
      0,
    );

    return [
      container({
        children: [
          container({
            children: [
              await image({
                src: "https://avatars.githubusercontent.com/u/46284513",
                height: 200,
                width: 200,
                style: {
                  borderRadius: 999,
                  width: 100,
                  height: 100,
                },
              }),
              container({
                children: [
                  text(name, h1),
                  text(`@${login}`, p),
                  text(
                    `Created at ${formatedDate} (${yearsSinceCreation} years ago)`,
                    p,
                  ),
                ],
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                },
              }),
            ],
            style: {
              flexDirection: "row",
              gap: 20,
            },
          }),
          container({
            children: [
              iconLabel({
                icon: await repositoryIcon(),
                label: text(`${public_repos} Repositories`, p),
              }),
              iconLabel({
                icon: await codeIcon(),
                label: text(`${public_gists} Gists`, p),
              }),
              iconLabel({
                icon: await usersIcon(),
                label: text(`${followers} Followers`, p),
              }),
              iconLabel({
                icon: await starIcon(),
                label: text(`${stargazersCount} Stars`, p),
              }),
            ],
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
            },
          }),
        ],
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 20,
        },
      }),
    ];
  }
}
