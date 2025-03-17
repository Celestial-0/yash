"use client";

import { Flex } from "@radix-ui/themes";
import { useEffect, useState, useMemo } from "react";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";

interface SubmissionStat {
  difficulty: string;
  count: number;
}

interface UserData {
  profile: {
    ranking: number;
  };
  allStats: {
    acSubmissionNum: SubmissionStat[];
  };
  allQuestionsCount: SubmissionStat[];
}

export default function LeetcodeUser() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const NextResponse = await fetch("/api/leetcode-user");
        const data: UserData = await NextResponse.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching Leetcode contributions:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Use useMemo to avoid unnecessary recalculations
  const allCount = useMemo(() => {
    return userData?.allQuestionsCount.find((item) => item.difficulty === "All");
  }, [userData?.allQuestionsCount]);

  const allSubmissions = useMemo(() => {
    return userData?.allStats.acSubmissionNum.find(
      (item) => item.difficulty === "All"
    );
  }, [userData?.allStats.acSubmissionNum]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error loading data.</div>;
  }

  return (
    <Flex direction="column" gap="2" className="w-full rounded-xl">
      {allCount && <div>{`All Questions Count: ${allCount.count}`}</div>}
      {allSubmissions && (
        <div>{`All Submissions: ${allSubmissions.count}`}</div>
      )}
      {allCount && allSubmissions && (
        <AnimatedCircularProgressBar
          max={allCount.count}
          min={0}
          value={allSubmissions.count}
          gaugePrimaryColor="rgb(79 70 229)"
          gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
        />
      )}
    </Flex>
  );
}
