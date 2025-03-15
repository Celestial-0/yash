import BlurFade from "@/components/magicui/blur-fade";
import { Flex, Heading } from "@radix-ui/themes";
import React from "react";
import { SectionHeading } from "../section-heading";
import ContactCard from "./contact-card";

const BLUR_FADE_DELAY = 0.04;

export const Contact = () => {
  return (
    <Flex direction="column" gap="8"  pb={"9"}>
      <BlurFade delay={BLUR_FADE_DELAY * 16}>
        <Flex direction="column" gap="5">
          <SectionHeading title="Contact Me" />
          <Heading size="6" weight="bold" align="center">
            Get in Touch
          </Heading>
          <ContactCard />
        </Flex>
      </BlurFade>
    </Flex>
  );
};
