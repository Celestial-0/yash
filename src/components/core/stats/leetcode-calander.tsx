"use client"; // Ensure it's a client component

import React from "react";
import { useEffect, useState } from "react";
import ActivityCalendar from "@/components/core/ActivityCalendar/ActivityCalendar";
import type { ThemeInput } from "@/components/core/ActivityCalendar/ActivityCalendar";
import { Tooltip as MuiTooltip } from "@mui/material";
import { Flex } from "@radix-ui/themes";

export function LeetcodeCalendar() {
  const [contributions, setContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/leetcode");
        const data = await response.json();
        setContributions(data);
      } catch (error) {
        console.error("Error fetching Leetcode contributions:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="p-4 ">Loading...</div>;
  }

  if (!contributions.length) {
    return <div className="p-4 ">No contributions found.</div>;
  }

  const minimalTheme: ThemeInput = {
    light: ["hsl(0, 0%, 92%)", "rebeccapurple"],
    
  };

  return (

    <Flex className="p-4 rounded-lg">
      <ActivityCalendar
        data={contributions}
        theme={minimalTheme}
        renderBlock={(block, activity) => (
          <MuiTooltip
            title={`${activity.count} activities on ${activity.date}`}
          >
            {block}
          </MuiTooltip>
        )}
        renderColorLegend={(block, level) => (
          <MuiTooltip title={`Level: ${level}`}>{block}</MuiTooltip>
        )}
      />
    </Flex>
    
  );
}
