import { Module } from "./base";
import {
  getClosedPullRequests,
  getCloseIssues,
  getMergedPullRequests,
  getOpenIssues,
  getOpenPullRequests,
} from "../services/github";
import { container, text } from "takumi-js/helpers";
import iconLabel from "../contents/icon-label";
import { h3, h4, p } from "../styles";
import issuesChart from "../contents/issues-chart";
import { openIssueIcon, pulseIcon } from "../icons";
import { openPrIcon } from "../icons/open-pr";
import { mergedPrIcon } from "../icons/merged-pr";
import { closedIssueIcon } from "../icons/closed-issue";

export class IssuesPRsModule extends Module {
  constructor(debug: boolean = false) {
    super(
      {
        name: "GitHub Issues and PRs",
        description: "Issues and PRs Stats",
        width: 600,
        height: 150,
      },
      debug,
    );
  }

  override async content() {
    const [openIssues, closedIssues, openPr, mergedPr] = await Promise.all([
      getOpenIssues(),
      getCloseIssues(),
      getOpenPullRequests(),
      getMergedPullRequests(),
    ]);

    return [
      container({
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 20,
        },
        children: [
          iconLabel({
            icon: await pulseIcon(),
            label: text("GitHub Issues and PRs", h3),
          }),
          container({
            style: {
              display: "flex",
              flexDirection: "row",
              alignContent: "space-between",
              gap: 20,
            },
            children: [
              container({
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  gap: 10,
                },
                children: [
                  text("Issues", h4),
                  issuesChart({
                    items: [
                      {
                        value: openIssues.total_count,
                        color: "#238636",
                        label: iconLabel({
                          icon: await openIssueIcon("#238636"),
                          label: text(`${openIssues.total_count} open`, p),
                        }),
                      },
                      {
                        value: closedIssues.total_count,
                        color: "#8957e5",
                        label: iconLabel({
                          icon: await closedIssueIcon("#8957e5"),
                          label: text(`${closedIssues.total_count} closed`, p),
                        }),
                      },
                    ],
                  }),
                ],
              }),
              container({
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: 1,
                  gap: 10,
                },
                children: [
                  text("Pull Requests", h4),
                  issuesChart({
                    items: [
                      {
                        value: openPr.total_count,
                        color: "#238636",
                        label: iconLabel({
                          icon: await openPrIcon("#238636"),
                          label: text(`${openPr.total_count} open`, p),
                        }),
                      },
                      {
                        value: mergedPr.total_count,
                        color: "#8957e5",
                        label: iconLabel({
                          icon: await mergedPrIcon("#8957e5"),
                          label: text(`${mergedPr.total_count} merged`, p),
                        }),
                      },
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ];
  }
}
