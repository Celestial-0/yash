import React from "react";
import { Flex, Heading } from "@radix-ui/themes";
import { GitContributionMap } from "@/components/core/stats/github-graph";
import GitHubCalendar from "react-github-calendar";
import { SectionHeading } from "../section-heading";

export default function Stats() {
  return (
    <Flex direction={"column"} gap={"5"} mb={"9"} >
      <SectionHeading title="Stats"/>
      <Flex direction={"column"} className={"w-full justify-between"} gap={"3"}>
        <Heading className="font-bold" size={{ initial: "2", sm: "6" }}>GitHub Contributions</Heading>

        <GitContributionMap />
        {/* <GitHubCalendar username="Celestial-0" /> */}
      </Flex>
    </Flex>
  );
}
