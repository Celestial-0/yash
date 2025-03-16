import React from "react";
import { Flex, Heading } from "@radix-ui/themes";
import GitHubCalendar from "react-github-calendar";
import { SectionHeading } from "../section-heading";
import { Leetcode } from "./leetcode";

export default function Stats() {
  return (
    <Flex direction={"column"} gap={"6"} mb={"2"}>
      <SectionHeading title="Stats" />
      <Flex direction={"column"} className={"w-full justify-between"} gap={"3"}>
        <Heading className="font-bold" size={{ initial: "2", sm: "6" }}>
          Leetcode
        </Heading>
        <Leetcode />
        <Heading className="font-bold" size={{ initial: "2", sm: "6" }}>
          GitHub
        </Heading>
        <GitHubCalendar username="Celestial-0" />
      </Flex>
    </Flex>
  );
}
