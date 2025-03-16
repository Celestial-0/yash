"use client"; // Ensure it's a client component

import React from "react";
import { useEffect, useState } from "react";
import { ActivityCalendar, ThemeInput } from "react-activity-calendar";
import { Tooltip as MuiTooltip } from "@mui/material";

export function GitHubCalendar() {
  const [contributions, setContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/github");
        const data = await response.json();
        setContributions(data);
      } catch (error) {
        console.error("Error fetching GitHub contributions:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="p-4 ">Loading...</div>;
  }

  // If contributions is empty, optionally render a message or handle it accordingly.
  if (!contributions.length) {
    return <div className="p-4 ">No contributions found.</div>;
  }

  const minimalTheme: ThemeInput = {
    light: ["hsl(0, 0%, 92%)", "rebeccapurple"],
    // for `dark` the default theme will be used
  };
  // const explicitTheme: ThemeInput = {
  //   light: ["#f0f0f0", "#c4edde", "#7ac7c4", "#f73859", "#384259"],
  //   dark: ["#383838", "#4D455D", "#7DB9B6", "#F5E9CF", "#E96479"],
  // };

  return (
    // <div className="p-4 rounded-lg">
    <>
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

     
    </>

  );
}
