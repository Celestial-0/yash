import TerminalUI from "@/components/core/terminal/terminal";
import { Flex } from "@radix-ui/themes";
import React from "react";

export default function Page() {
  return (
    <Flex direction={"column"} gap={"6"} mb={"2"} className="w-full justify-center items-center">
      <TerminalUI />
    </Flex>
  );
}
