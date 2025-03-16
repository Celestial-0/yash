import React from "react";
import { Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { AuroraText } from "@/components/magicui/aurora-text";

export default function ContactCard() {
  return (
    <Flex direction="column" align="center" className="text-center w-full">
      <Heading size="7" className="font-bold tracking-tighter pb-6">
        Want to chat? Just shoot me a DM{" "}
        <Link
          href="https://x.com/Celestial_Yash"
          className="text-primary hover:underline"
        >
          <AuroraText>&nbsp;with a direct question on Twitter&nbsp;</AuroraText>
        </Link>
        or{" "}
        <Link
          href="https://www.instagram.com/yash.kumar.singh.30/"
          className="text-primary hover:underline"
        >
          <AuroraText>&nbsp;drop a message on Instagram&nbsp;</AuroraText>
        </Link>
        and I'll respond whenever I can. I will ignore all soliciting.
      </Heading>
    </Flex>
  );
}
