import React from "react";
import { Flex, Heading } from "@radix-ui/themes";
import { SectionHeading } from "../section-heading";
import { GitHubCalendar } from "./github-calander";
import { LeetcodeCalendar } from "./leetcode-calander";
import LeetcodeProgress from "./leetcode-progress";
export const Stats = () => {
  return (
    <>
      <Flex direction={"column"} gap={"6"} mb={"2"} id="stats">
        <SectionHeading title="Stats" />
        <Flex
          direction={"column"}
          className={"w-full justify-between"}
          gap={"3"}
        >
          <Heading className="font-bold pb-6" size={{ initial: "2", sm: "6" }}>
            Leetcode
          </Heading>

          <LeetcodeProgress />

          <LeetcodeCalendar />
          <Heading className="font-bold pb-4" size={{ initial: "2", sm: "6" }}>
            GitHub
          </Heading>
          <GitHubCalendar />
        </Flex>
      </Flex>
    </>
  );
}
