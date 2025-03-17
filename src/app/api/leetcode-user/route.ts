import { NextResponse } from 'next/server';
import { LeetCode, Credential } from 'leetcode-query';

export async function GET() {

    try {
        // Initialize LeetCode credentials using the session cookie.
        const credential = new Credential();
        // Create LeetCode client instance.
        const leetcode = new LeetCode(credential);

        const user = await leetcode.user("Celestial-0");
        const profile = user.matchedUser?.profile;
        const allStats = user.matchedUser?.submitStats;
        const allQuestionsCount = user.allQuestionsCount;

        if (allStats && profile) {
            return NextResponse.json({ profile, allStats, allQuestionsCount });
        } else {
            return NextResponse.json({ error: 'Incomplete data from LeetCode API' }, { status: 500 });
        }

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { error: 'LeetCode API error', details: errorMessage },
            { status: 500 }
        );
    }
}
