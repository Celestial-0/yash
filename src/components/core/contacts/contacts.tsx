import BlurFade from "@/components/magicui/blur-fade";
import { Flex, Heading } from "@radix-ui/themes";
import React from "react";
import { SectionHeading } from "../section-heading";
import ContactCard from "./contact-card";
import { Meteor } from "@/components/core/meteors-ui";

const BLUR_FADE_DELAY = 0.04;

export const Contact = () => {
  return (
    <>
    <Flex direction="column" gap="6" mb={'2'}>
      <BlurFade delay={BLUR_FADE_DELAY * 16}>
        <Flex direction="column" gap="3">
          <SectionHeading title="Contact Me" />
          <Heading size={{ initial: '4', sm: '8' }} weight="bold" align="center">
            Get in Touch
          </Heading>
          <ContactCard />
        </Flex>
      </BlurFade>
    </Flex>
    <Meteor />
    </>
  );
};
