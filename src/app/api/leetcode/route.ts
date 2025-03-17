import { NextResponse } from 'next/server';
import { LeetCode, Credential } from 'leetcode-query';

// Helper: Format timestamp to YYYY-MM-DD
function getDateString(timestamp: number) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper: Compute level based on count (adjust thresholds as needed)
function getLevel(count: number) {
  if (count >= 30) return 4;
  if (count >= 10) return 3;
  if (count >= 1) return 1;
  return 0;
}

export async function GET(request: Request) {
  const sessionCookie = process.env.LEETCODE_SESSION_COOKIE;
  if (!sessionCookie) {
    return NextResponse.json(
      { error: 'Missing LeetCode session cookie' },
      { status: 500 }
    );
  }

  // Optional: Get the "year" filter from query params (e.g., ?year=2024)
  const { searchParams } = new URL(request.url);
  const filterYear = searchParams.get("year"); // e.g., "2024"

  try {
    // Initialize LeetCode credentials using the session cookie.
    const credential = new Credential();
    await credential.init(sessionCookie);

    // Create LeetCode client instance.
    const leetcode = new LeetCode(credential);

    

    // Fetch a batch of submissions (e.g., 2000 recent submissions).
    const submissionsData = await leetcode.submissions({ limit: 1000 });

    // Process submissions: group them by full date (YYYY-MM-DD)
    const contributionsMap: { [key: string]: number } = {};
    submissionsData.forEach((submission) => {
      const dateStr = getDateString(submission.timestamp);
      // If a filter year is specified, only include dates that start with that year.
      if (filterYear && !dateStr.startsWith(filterYear)) {
        return;
      }
      contributionsMap[dateStr] = (contributionsMap[dateStr] || 0) + 1;
    });

    // Transform the grouped data into an array of objects, then sort them by date.
    const contributions = Object.entries(contributionsMap)
      .map(([date, count]) => ({
        date,
        count,
        level: getLevel(count),
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Return the aggregated and sorted data as JSON.
    return NextResponse.json(contributions);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'LeetCode API error', details: errorMessage },
      { status: 500 }
    );
  }
}
