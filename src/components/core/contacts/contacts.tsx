import BlurFade from "@/components/magicui/blur-fade";
import { Flex, Heading } from "@radix-ui/themes";
import React from "react";
import { SectionHeading } from "../section-heading";
import ContactCard from "./contact-card";

const BLUR_FADE_DELAY = 0.04;

export const Contact = () => {
  return (
    <Flex direction="column" gap={"8"} className={"max-w-fit"} >
      <BlurFade delay={BLUR_FADE_DELAY * 16}>
        <Flex direction={"column"} gap = {"5"}>

        <SectionHeading title={"Contact Me"}  />

        <Flex gap={{ initial: '1', sm: '2' }} justify={ 'center' }>
                <Heading size={ '6' } weight={ 'bold' } align={ 'center' }>
                Get in Touch
                </Heading>
        </Flex>

        <Flex className={ 'w-full' } gap={ '3' } justify={ 'between' } align={ 'center' } direction={ 'column' } pb={ '5' } mb={ '9' }>   
          <ContactCard/>
        </Flex>
        </Flex>
      </BlurFade>
    </Flex>
  );
};
