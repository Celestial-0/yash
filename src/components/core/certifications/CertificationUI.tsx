"use client";

import { CERTIFICATE } from "@/types/certification";
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  Flex,
  Heading,
  Inset,
  Link,
  ScrollArea,
  Text,
  Tooltip,
  VisuallyHidden,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";

import Image from "next/image";
import { TECHNOLOGY_ICONS } from "@/constants/technology-icons";

export default function Certification(certificate: CERTIFICATE) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Format date function
  const formatDate = (dateStr?: string) => {
    const [year, month] = dateStr ? dateStr.split("-") : [undefined, undefined];
    const date = new Date(Number(year), Number(month));

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Flex
          className={`transition-all w-full rounded-xl p-4 md:p-2 ${
            isExpanded
              ? "bg-[--color-background] shadow-[--gray-3]"
              : "cursor-pointer"
          }`}
          onClick={toggleExpand}
          gap="3"
        >
          <Avatar
            src={certificate.imgSrc}
            radius="none"
            fallback={getInitials(certificate.name)}
            size="4"
          />

          <Flex direction="column" className="w-full">
            <Flex justify="between" align="center" direction="row">
              <Flex direction="column" style={{ flex: 4 }}>
                <Flex align="center" gap="2">
                  <Text className="font-semibold text-base sm:text-lg">
                    {certificate.name}
                  </Text>
                </Flex>
                <Text size="2" className="text-gray-400 text-sm sm:text-base">
                  {certificate.issuingOrganization}
                </Text>
              </Flex>
              <Flex style={{ flex: 1 }}>
                <Text size="2" className="text-gray-500 text-xs sm:text-sm">
                  {"Issued: " + formatDate(certificate.issueDate)}
                  {certificate.expirationDate
                    ? " - " + formatDate(certificate.expirationDate)
                    : ""}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Dialog.Trigger>
      <Dialog.Content size={"1"} className={"!outline-none"}>
        <VisuallyHidden>
          <Dialog.Title>{certificate.name}</Dialog.Title>
        </VisuallyHidden>
        <Inset clip={"padding-box"} side={"top"} pb={"current"}>
          <Image
            priority
            src={certificate.certificateImg || certificate.imgSrc}
            alt={"placeholder"}
            width={1000}
            height={400}
            className={"w-fit rounded-t-xl border-b-[3px] border-[--gray-12]"}
          />
        </Inset>
        <Flex justify={"between"}>
          <Heading size={"5"} weight={"bold"}>
            {certificate.name}
          </Heading>
          {/* <Flex gap={ '2' }>
                            { certificate.skills.map((technology, index) => {
                                
                                const IconComponent = TECHNOLOGY_ICONS[technology];

                                return (
                                    <Tooltip key={ index } content={ technology } className={ 'bg-[--gray-12]' }>
                                        <Box>
                                            <IconComponent size={ '1.5rem' } className={ 'text-[--gray-12]' } />
                                        </Box>
                                    </Tooltip>
                                );
                            }) }
                        </Flex> */}
        </Flex>
        <Text size={"1"} className={"text-[#607B96]"}>
          {`// ${certificate.credentialID}`}
        </Text>
        <Container size={"1"}>
          <ScrollArea className={"max-h-48"}>
            <Dialog.Description
              size={"2"}
              className={"whitespace-pre-wrap pt-4"}
            >
              <Text weight={"medium"} className={"text-[--gray-9]"}>
                {certificate.description}
              </Text>
            </Dialog.Description>
          </ScrollArea>
        </Container>
        <Flex direction={{ initial: "column", sm: "row" }} gap={"3"} mt={"5"}>
          <Button
            asChild
            variant={"outline"}
            className={"transition-all sm:flex-1 cursor-pointer"}
            size={{ initial: "3", sm: "4" }}
          >
            <Flex>
              {"Issued on: " +formatDate(certificate.issueDate)}
            </Flex>
          </Button>
          <Button
            asChild
            variant={"soft"}
            className={
              "transition-all sm:flex-1 cursor-pointer text-[--gray-1] bg-[--gray-12]"
            }
            size={{ initial: "3", sm: "4" }}
          >
            <Link href={certificate.credentialURL}>Certificate</Link>
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
