import BlurFade from "@/components/magicui/blur-fade";
import { Flex, Heading } from "@radix-ui/themes";
import React from "react";
import { SectionHeading } from "../section-heading";
import ContactCard from "./contact-card";

const BLUR_FADE_DELAY = 0.04;

export const Contact = () => {
  return (
    <Flex direction="column" gap={"8"}>
      <BlurFade delay={BLUR_FADE_DELAY * 16}>
        <Flex direction={"column"} gap={"5"}>
          <SectionHeading title={"Contact Me"} />

          <Flex justify={"center"} direction={"column"} >
            <Heading size={"6"} weight={"bold"} align={"center"}>
              Get in Touch
            </Heading>
          </Flex>

          <Flex 
            direction={"column"}
            gap={"3"}
            mb={{ sm: '6', lg: '9' }}
            justify={"center"}
            align={"center"}
            width={"full"}
            
          >
            <ContactCard />
          </Flex>
        </Flex>
      </BlurFade>
    </Flex>
  );
};
