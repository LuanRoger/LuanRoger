import { container, image, text } from "@takumi-rs/helpers";
import { Module } from "./base";
import { h1, p } from "@/styles";
import { getGitHubProfile, getGitHubRepos } from "../services";
import { usersIcon, repositoryIcon, codeIcon, starIcon } from "../icons";
import IconLabel from "../contents/icon-label";

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
              image({
                src: "github-profile.jpg",
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
              IconLabel(
                await repositoryIcon(),
                text(`${public_repos} Repositories`, p),
              ),
              IconLabel(await codeIcon(), text(`${public_gists} Gists`, p)),
              IconLabel(await usersIcon(), text(`${followers} Followers`, p)),
              IconLabel(await starIcon(), text(`${stargazersCount} Stars`, p)),
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
