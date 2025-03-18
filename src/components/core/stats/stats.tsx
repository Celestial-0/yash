import React from "react";
import { Flex, Heading } from "@radix-ui/themes";
import { SectionHeading } from "../section-heading";
import { GitHubCalendar } from "./github-calander";
import { LeetcodeCalendar } from "./leetcode-calander";
import LeetcodeProgress from "./leetcode-progress";

export default function Stats() {
  return (
    <>
      <Flex direction={"column"} gap={"6"} mb={"2"} id="stats">
        <SectionHeading title="Stats" />
        <Flex
          direction={"column"}
          className={"w-full justify-between"}
          gap={"3"}
        >
          <Heading className="font-bold" size={{ initial: "2", sm: "6" }} >
            Leetcode
          </Heading>
          <Flex direction={"row"}>
          
          <LeetcodeProgress />
          </Flex>
          <LeetcodeCalendar />
          <Heading className="font-bold" size={{ initial: "2", sm: "6" }}>
            GitHub
          </Heading>
          <GitHubCalendar />
        </Flex>
      </Flex>
    </>
  );
}
