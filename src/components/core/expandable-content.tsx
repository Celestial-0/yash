"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa6";
import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { Experience } from "@/types/experience";

export default function ExpandableContent({
  experience,
}: {
  experience: Experience;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Format date function
  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(new Date(dateStr));
  };

  // Generate fallback initials
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  return (
    <Flex
      className={`transition-all w-full rounded-xl p-2 ${
        isExpanded
          ? "bg-[--color-background] shadow-md shadow-[--gray-3]"
          : "cursor-pointer"
      }`}
      onClick={toggleExpand}
      gap="3"
    >
      {/* Avatar with fallback initials */}
      <Avatar
        src={experience.logoUrl}
        radius="full"
        fallback={getInitials(experience.company)}
        size="4"
      />

      <Flex direction="column" className="w-full">
        <Flex justify="between" align="center">
          <Flex direction="column">
            <Flex align="center" gap="2">
              <Text className="font-semibold">{experience.company}</Text>
              <button
                className="focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand();
                }}
                aria-label={isExpanded ? "Collapse content" : "Expand content"}
                title={isExpanded ? "Collapse content" : "Expand content"}
              >
                <FaChevronRight
                  size="1rem"
                  className={`transform transition-transform duration-300 ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                />
              </button>
            </Flex>
            <Text size="2" className="text-gray-400">
              {experience.role}
            </Text>
          </Flex>

          {/* Dynamic date range */}
          <Text size="2" className="text-gray-500">
            {formatDate(experience.startDate)} -{" "}
            {experience.endDate ? formatDate(experience.endDate) : "Present"}
          </Text>
        </Flex>

        {/* Expandable description */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? "auto" : 0,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <Box className="pt-4">
            <Text>{experience.description}</Text>
          </Box>
        </motion.div>
      </Flex>
    </Flex>
  );
}
