import React from "react";
import { Flex, Heading } from "@radix-ui/themes";
import { SectionHeading } from "../section-heading";
import { Leetcode } from "./leetcode";
import { GitHubCalendar } from "./github-calander";

export default function Stats() {
  return (
    <>
    <Flex direction={"column"} gap={"6"} mb={"2"} id="stats">
      <SectionHeading title="Stats" />
      <Flex direction={"column"} className={"w-full justify-between"} gap={"3"}>
        <Heading className="font-bold" size={{ initial: "2", sm: "6" }}>
          Leetcode
        </Heading>
        <Leetcode />
        <Heading className="font-bold" size={{ initial: "2", sm: "6" }}>
          GitHub
          <GitHubCalendar/>
        </Heading>
      </Flex>
    </Flex>
    </>
  );
}
