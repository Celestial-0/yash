import React from "react";
import { Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { AuroraText } from "@/components/magicui/aurora-text";

export default function ContactCard() {
  return (
    <Flex direction="column" align="center" className="w-full mx-auto text-center">
      <Heading
        size="5"
        className="font-bold tracking-tighter md:text-2xl lg:text-3xl"
      >
        Want to chat? Just shoot me a DM{" "}
        <Link
          href="https://x.com/Celestial_Yash"
          className="text-primary hover:underline"
        >
            <AuroraText>with a direct question on Twitter</AuroraText>
        </Link>{" "}
        and I'll respond whenever I can. I will ignore all soliciting.
      </Heading>
    </Flex>
  );
}
