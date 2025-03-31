"use server";

import { NextResponse } from 'next/server';
import ALLOWED_ORIGINS from '@/constants/allowed-origin';

export async function GET(request: Request): Promise<Response> {
  const username = "Celestial-0";

  // Compute the time range: from one year ago to now.
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);

  // Validate the request origin against allowed origins.
  const origin = request.headers.get('origin') || request.headers.get('referer');
  if (!origin || !ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // GraphQL query to fetch the submission calendar for the given username.
  const query = `
    query {
      matchedUser(username: "${username}") {
        submissionCalendar
      }
    }
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error(`LeetCode API error: ${response.status} ${response.statusText}`);
    }

    const json = await response.json();

    if (json.errors) {
      const errors = json.errors.map((err: { message: string }) => err.message).join(", ");
      throw new Error(errors);
    }

    const matchedUser = json.data?.matchedUser;
    if (!matchedUser || !matchedUser.submissionCalendar) {
      return NextResponse.json(
        { error: "User not found or no submission data available." },
        { status: 404 }
      );
    }

    // Parse the submissionCalendar JSON.
    let submissionCalendar: Record<string, number>;
    try {
      submissionCalendar = JSON.parse(matchedUser.submissionCalendar);
    } catch (parseError) {
      throw new Error("Failed to parse submission calendar data." + parseError);
    }

    // Aggregate submissions within the one-year sliding window.
    const contributions = Object.entries(submissionCalendar).reduce(
      (acc, [timestampStr, count]) => {
        const timestamp = parseInt(timestampStr, 10);
        const dateObj = new Date(timestamp * 1000);
        if (dateObj >= startDate && dateObj <= endDate) {
          // Convert to ISO date string (YYYY-MM-DD)
          const dateStr = dateObj.toISOString().split("T")[0];
          acc[dateStr] = count;
        }
        return acc;
      },
      {} as Record<string, number>
    );

    // Process the aggregated data: add level and sort by date.
    const result = Object.entries(contributions)
      .map(([date, count]) => ({
        date,
        count,
        level: count >= 30 ? 4 : count >= 10 ? 3 : count >= 5 ? 2 : count >= 1 ? 1 : 0,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * OPTIONS handler for preflight CORS requests.
 */
export async function OPTIONS(): Promise<Response> {
  return new NextResponse(null, {
    status: 200,
    headers: { Allow: "GET, OPTIONS" }
  });
}
