"use client";

import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";

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

  

  return (
    <Flex direction="column" gap="2" className="w-full rounded-xl">
      
    </Flex>
  );
}
