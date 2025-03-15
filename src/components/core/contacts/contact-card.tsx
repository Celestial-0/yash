import React from "react";
import { Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { AuroraText } from "@/components/magicui/aurora-text";

export default function ContactCard() {
  return (
    <Flex direction="column" align="center" className="text-center w-full" >
      <Heading size="5" className="font-bold tracking-tighter pb-6 ">
        Want to chat? Just shoot me a DM {" "}
        <Link

          href="https://x.com/Celestial_Yash"
          className="text-primary hover:underline"
        >
          <AuroraText >with a direct question on Twitter &nbsp; </AuroraText>
        </Link>
        and I'll respond whenever I can. I will ignore all soliciting.
      </Heading>
    </Flex>
  );
}
