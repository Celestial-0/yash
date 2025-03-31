"use server";

import { NextResponse } from 'next/server';
import { graphql } from '@octokit/graphql';
import ALLOWED_ORIGINS from '@/constants/allowed-origin';

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel: string;
}

interface Week {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  weeks: Week[];
}

interface ContributionsCollection {
  contributionCalendar: ContributionCalendar;
}

interface User {
  contributionsCollection: ContributionsCollection;
}

interface QueryResult {
  user: User;
}

const levelMap: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

export async function GET(request: Request) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    return NextResponse.json({ error: 'Missing GitHub token' }, { status: 500 });
  }

  const originHeader = request.headers.get('origin') || request.headers.get('referer');
  let origin;
  try {
    origin = originHeader ? new URL(originHeader).origin : originHeader;
  } catch {
    origin = originHeader;
  }

  if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const username = 'Celestial-0';

  const query = `
    query ($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const result: QueryResult = await graphql(query, {
      login: username,
      headers: { authorization: `Bearer ${GITHUB_TOKEN}` },
    });

    // Optimized filtering and mapping using a single loop
    const contributions: { date: string; count: number; level: number }[] = [];
    for (const week of result.user.contributionsCollection.contributionCalendar.weeks) {
      for (const day of week.contributionDays) {
        if (day.contributionCount > 0) {
          contributions.push({
            date: day.date,
            count: day.contributionCount,
            level: levelMap[day.contributionLevel] || 0,
          });
        }
      }
    }

    return NextResponse.json(contributions);
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json({ error: 'GitHub API error', details: (error as Error).message }, { status: 500 });
  }
}
