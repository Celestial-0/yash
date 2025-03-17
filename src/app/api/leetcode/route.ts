export async function GET(request: Request) {
  const sessionCookie = process.env.LEETCODE_SESSION_COOKIE;
  if (!sessionCookie) {
    return new Response(JSON.stringify({ error: "Missing LeetCode session cookie" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const filterYear = new URL(request.url).searchParams.get("year");
  const query = `
    query submissionList($offset: Int!, $limit: Int!) {
      submissionList(offset: $offset, limit: $limit) {
        submissions {
          timestamp
        }
      }
    }
  `;

  try {
    const totalSubmissionsNeeded = 1000;
    const batchSize = 20;
    const totalBatches = Math.ceil(totalSubmissionsNeeded / batchSize);

    // Create an array of offsets for each batch (e.g., 0, 20, 40, ..., up to (totalBatches-1)*batchSize)
    const offsets = Array.from({ length: totalBatches }, (_, i) => i * batchSize);

    // Launch all requests concurrently
    const fetchPromises = offsets.map((offset) =>
      fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cookie": `LEETCODE_SESSION=${sessionCookie}`,
        },
        body: JSON.stringify({ query, variables: { offset, limit: batchSize } }),
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error(`LeetCode API error: ${response.statusText}`);
        }
        const json = await response.json();
        if (json.errors) {
          throw new Error(json.errors.map((err: { message: string }) => err.message).join(", "));
        }
        return json.data.submissionList.submissions;
      })
    );

    // Wait for all batches to complete
    const batchResults: { timestamp: number }[][] = await Promise.all(fetchPromises);

    // Combine all submissions from each batch
    let allSubmissions: { timestamp: number }[] = [];
    for (const submissions of batchResults) {
      // If one batch returns an empty array, assume no further submissions exist
      if (submissions.length === 0) break;
      allSubmissions = allSubmissions.concat(submissions);
    }

    // Limit to the totalSubmissionsNeeded, if there are more
    allSubmissions = allSubmissions.slice(0, totalSubmissionsNeeded);

    // Aggregate submissions by date and compute levels
    const contributions = allSubmissions.reduce((acc: Map<string, number>, { timestamp }: { timestamp: number }) => {
      const date = new Date(timestamp * 1000).toISOString().split("T")[0];
      if (!filterYear || date.startsWith(filterYear)) {
        acc.set(date, (acc.get(date) || 0) + 1);
      }
      return acc;
    }, new Map());

    const result = [...contributions.entries()]
      .map(([date, count]) => ({
        date,
        count,
        level: count >= 30 ? 4 : count >= 10 ? 3 :  count >= 5 ? 2 : count >= 1 ? 1 : 0,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
