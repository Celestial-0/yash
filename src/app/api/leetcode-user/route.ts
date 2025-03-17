import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Define the GraphQL query and variables
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          profile {
            userAvatar
            realName
            aboutMe
            reputation
            ranking
          }
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
        }
        allQuestionsCount {
          difficulty
          count
        }
      }
    `;
    const variables = { username: "Celestial-0" };

    // Make a POST request to LeetCode's GraphQL endpoint
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();

    // Destructure data from the response
    const { matchedUser, allQuestionsCount } = result.data || {};

    if (matchedUser && matchedUser.profile && matchedUser.submitStats) {
      return NextResponse.json({
        profile: matchedUser.profile,
        allStats: matchedUser.submitStats,
        allQuestionsCount,
      });
    } else {
      return NextResponse.json(
        { error: 'Incomplete data from LeetCode API' },
        { status: 500 }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'LeetCode API error', details: errorMessage },
      { status: 500 }
    );
  }
}
