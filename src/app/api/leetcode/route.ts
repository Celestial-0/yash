"use server";

import { NextResponse } from 'next/server';
import { LeetCode, Credential } from 'leetcode-query';

// Helper: Format timestamp to YYYY-MM-DD
const formatDate = (timestamp: number) => {
  return new Date(timestamp).toISOString().split('T')[0]; // Efficient date extraction
};

// Helper: Compute level based on submission count
const getLevel = (count: number) => (count >= 30 ? 4 : count >= 10 ? 3 : count >= 1 ? 1 : 0);

import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const sessionCookie = process.env.LEETCODE_SESSION_COOKIE;
  if (!sessionCookie) {
    return NextResponse.json({ error: 'Missing LeetCode session cookie' }, { status: 500 });
  }

  // Extract query parameter for year filtering
  const filterYear = new URL(request.url).searchParams.get('year');

  try {
    // Initialize LeetCode API
    const credential = new Credential();
    await credential.init(sessionCookie);
    const leetcode = new LeetCode(credential);

    // Fetch recent submissions (adjust limit as needed)
    const submissions = await leetcode.submissions({ limit: 1000 });

    // Aggregate submission counts by date
    const contributions = new Map();
    for (const { timestamp } of submissions) {
      const date = formatDate(timestamp);
      if (!filterYear || date.startsWith(filterYear)) {
        contributions.set(date, (contributions.get(date) || 0) + 1);
      }
    }

    // Convert map to sorted array
    const result = [...contributions.entries()]
      .map(([date, count]) => ({ date, count, level: getLevel(count) }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'LeetCode API error', details: (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}
