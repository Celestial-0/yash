"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { Flex, Text } from "@radix-ui/themes";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface SubmissionStat {
  difficulty: string;
  count: number;
}

interface UserData {
  profile?: { ranking: number };
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

  // Fetch data from API and delay a little for smooth animation.
  useEffect(() => {
    const fetchData = async () => {
      const startTime = Date.now();
      try {
        const response = await fetch("/api/leetcode-user");
        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching Leetcode data:", error);
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(200 - elapsed, 0);
        setTimeout(() => {
          setIsLoading(false);
        }, remaining);
      }
    };
    fetchData();
  }, []);

  // Calculate overall progress (across Easy, Medium, Hard).
  const overallStats = useMemo(() => {
    if (!userData)
      return { submittedTotal: 0, questionsTotal: 0, overallProgress: 0 };
    const difficultiesArr = ["Easy", "Medium", "Hard"];
    let submittedTotal = 0;
    let questionsTotal = 0;
    userData.allStats?.acSubmissionNum.forEach((stat) => {
      if (difficultiesArr.includes(stat.difficulty)) {
        submittedTotal += stat.count;
      }
    });
    userData.allQuestionsCount?.forEach((stat) => {
      if (difficultiesArr.includes(stat.difficulty)) {
        questionsTotal += stat.count;
      }
    });
    const overallProgress =
      questionsTotal > 0 ? (submittedTotal / questionsTotal) * 100 : 0;
    return { submittedTotal, questionsTotal, overallProgress };
  }, [userData]);

  // Helpers to get difficulty-specific stats.
  const getStat = useCallback(
    (difficulty: string) =>
      userData?.allStats?.acSubmissionNum.find(
        (stat) => stat.difficulty === difficulty
      ),
    [userData]
  );

  const getTotal = useCallback(
    (difficulty: string) =>
      userData?.allQuestionsCount?.find(
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

  // Prepare per-difficulty progress stats.
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

  // Component for individual difficulty progress with animation.
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
      <Flex direction="column" gap="2" className="w-full">
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
          className="h-2 ease-[cubic-bezier(0.65,0,0.35,1)] transition-all"
        />
      </Flex>
    );
  };

  if (isLoading) {
    return (
      <div className="flex gap-4 p-4 rounded-xl">

        <div className="flex items-center justify-center flex-grow">
          <Skeleton className="h-full w-full rounded-xl" />
        </div>

        <div className="flex flex-col gap-3 flex-grow-[4]">
          <Skeleton className="h-10 w-full rounded" />
          <Skeleton className="h-10 w-full rounded" />
          <Skeleton className="h-10 w-full rounded" />
        </div>
      </div>
    );
  }
  
  

  return (
    <Flex direction="row" gap="4" className="w-full p-4 rounded-xl">
      {/* Overall progress section with animated circular gauge */}
      <Flex direction="column" justify="center" className="grow">
        <AnimatedCircularProgressBar
          className="my-custom-progress-bar"
          max={100}
          min={0}
          value={overallStats.overallProgress}
          gaugePrimaryColor="rgb(79 70 229)"
          gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
          statCount={overallStats.submittedTotal}
          totalCount={overallStats.questionsTotal}
        />
      </Flex>

      {/* Difficulty-specific progress breakdown */}
      <Flex direction="column" gap="2" className="grow-[4]">
        {progressStats.map(
          ({ difficulty, statCount, totalCount, progress }) => {
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
          }
        )}
      </Flex>
    </Flex>
  );
}
