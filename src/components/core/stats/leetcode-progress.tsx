"use client";

import { Flex, Text } from "@radix-ui/themes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface SubmissionStat {
  difficulty: string;
  count: number;
}

interface UserData {
  profile: { ranking: number };
  allStats: { acSubmissionNum: SubmissionStat[] };
  allQuestionsCount: SubmissionStat[];
}

const difficulties = [
  { label: "Easy", color: "text-teal-500" },
  { label: "Medium", color: "text-yellow-500" },
  { label: "Hard", color: "text-red-500" },
];

export default function LeetcodeProgress() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const startTime = Date.now();
      try {
        const response = await fetch("/api/leetcode-user");
        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching Leetcode contributions:", error);
      } finally {
        // Ensure at least 2000ms delay for smooth animation.
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(200 - elapsed, 0);
        setTimeout(() => {
          setIsLoading(false);
        }, remaining);
      }
    };
    fetchData();
  }, []);

  const getStat = useCallback(
    (difficulty: string) =>
      userData?.allStats.acSubmissionNum.find(
        (stat) => stat.difficulty === difficulty
      ),
    [userData]
  );

  const getTotal = useCallback(
    (difficulty: string) =>
      userData?.allQuestionsCount.find(
        (stat) => stat.difficulty === difficulty
      ),
    [userData]
  );

  const getProgress = useCallback(
    (difficulty: string) => {
      const stat = getStat(difficulty);
      const total = getTotal(difficulty);
      return stat && total && total.count > 0
        ? (stat.count / total.count) * 100
        : 0;
    },
    [getStat, getTotal]
  );

  // Prepare progress stats; while loading, progress remains 0.
  const progressStats = useMemo(() => {
    if (isLoading || !userData) {
      return difficulties.map(({ label }) => ({
        difficulty: label,
        statCount: 0,
        totalCount: 0,
        progress: 0,
      }));
    }
    return difficulties.map(({ label }) => ({
      difficulty: label,
      statCount: getStat(label)?.count || 0,
      totalCount: getTotal(label)?.count || 0,
      progress: getProgress(label),
    }));
  }, [isLoading, userData, getStat, getTotal, getProgress]);

  if (isLoading) {
    return (
      <div className="flex items-center space-y-3">
       <Skeleton className="h-[175px] w-full rounded-xl" />
      </div>
    );
  }

  // Component for each difficulty that animates from 0 to target progress.
  const DifficultyStat = ({
    difficulty,
    color,
    statCount,
    totalCount,
    progress: targetProgress,
  }: {
    difficulty: string;
    color: string;
    statCount: number;
    totalCount: number;
    progress: number;
  }) => {
    const [displayProgress, setDisplayProgress] = useState(0);

    useEffect(() => {
      if (targetProgress > 0) {
        const timer = setTimeout(() => {
          setDisplayProgress(targetProgress);
        }, 100);
        return () => clearTimeout(timer);
      } else {
        setDisplayProgress(0);
      }
    }, [targetProgress]);

    return (
      <Flex direction="column" gap="1" className="w-full">
        <Flex justify="between">
          <Text weight="medium" className={`text-xs font-medium ${color}`}>
            {difficulty}
          </Text>
          <Text
            weight="medium"
            className="text-xs font-medium text-sd-foreground dark:text-sd-foreground-dark"
          >
            {statCount} / {totalCount}
          </Text>
        </Flex>
        <Progress
          value={displayProgress}
          className="h-2 ease-[cubic-bezier(0.65,0,0.35,1)] transition-all "
        />
      </Flex>
    );
  };

  return (
    <Flex
      direction="column"
      gap="2"
      className="min-h-[180px] w-full p-4 rounded-xl"
    >
      <Flex direction="column" gap="2" className="w-full h-[148px]">
        {progressStats.map(({ difficulty, statCount, totalCount, progress }) => {
          const { color } = difficulties.find((d) => d.label === difficulty)!;
          return (
            <DifficultyStat
              key={difficulty}
              difficulty={difficulty}
              color={color}
              statCount={statCount}
              totalCount={totalCount}
              progress={progress}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}
