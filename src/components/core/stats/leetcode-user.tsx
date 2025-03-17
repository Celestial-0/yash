"use client";

import { Flex, Text } from "@radix-ui/themes";
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

  const commonFlexClasses =
    "rounded-sd-sm relative h-full cursor-pointer items-center justify-center overflow-hidden shadow-[unset]";
  return (
    <Flex
      direction="column"
      gap="2"
      className="min-h-[180px] w-full p-4 rounded-xl"
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        userData && (
          <Flex direction="column" gap="2" className="w-full h-[148px]">
            <Flex direction="row" gap="2" className={commonFlexClasses}>
              <Flex direction="row" gap="2" className={commonFlexClasses}>
                <Flex direction="column" gap="2" className={commonFlexClasses}>
                  {/* circular progress bar */}
                </Flex>

                <Flex direction="column" gap="2" className={commonFlexClasses}>
                  {/* metric */}
                  <Flex
                    direction="column"
                    gap="2"
                    className="h-full w-[90px] flex-none"
                  >
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      gap="0.5"
                      className={`flex ${commonFlexClasses} w-full flex-1`}
                    >
                      <Text
                        weight="medium"
                        className="text-xs font-medium text-[#50e5e5]"
                      >
                        Easy
                      </Text>
                      <Text
                        weight="medium"
                        className="text-xs font-medium text-sd-foreground dark:text-sd-foreground-dark"
                      >
                        {userData.allStats.acSubmissionNum[1].count +
                          " / " +
                          userData.allQuestionsCount[1].count}
                      </Text>
                    </Flex>
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      gap="0.5"
                      className={`flex ${commonFlexClasses} w-full flex-1`}
                    >
                      <Text
                        weight="medium"
                        className="text-xs font-medium text-[#ffbe1a]"
                      >
                        Med.
                      </Text>
                      <Text
                        weight="medium"
                        className="text-xs font-medium text-sd-foreground dark:text-sd-foreground-dark"
                      >
                        {userData.allStats.acSubmissionNum[2].count +
                          " / " +
                          userData.allQuestionsCount[2].count}
                      </Text>
                    </Flex>
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      gap="0.5"
                      className={`flex ${commonFlexClasses} w-full flex-1`}
                    >
                      <Text
                        weight="medium"
                        className="text-xs font-medium text-[#f74242] "
                      >
                        Hard
                      </Text>
                      <Text
                        weight="medium"
                        className="text-xs font-medium text-sd-foreground dark:text-sd-foreground-dark"
                      >
                        {userData.allStats.acSubmissionNum[3].count +
                          " / " +
                          userData.allQuestionsCount[3].count}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        )
      )}
    </Flex>
  );
}
