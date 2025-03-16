"use client";

import { Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export function Leetcode({ username = "Celestial-0" }) {
  const { theme } = useTheme(); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); 
  }, []);


  return (
    <Flex justify="center" align="center" className="p-4">
      {mounted && theme ? (
        <Image
        src={`https://leetcard.jacoblin.cool/${username}?theme=${theme || "light"}&ext=heatmap&font=geistMono&border=0&radius=20&hide=ranking`}
        width={500} 
        height={200}
          alt={`${username}'s Leetcode Stats`}
          unoptimized 
          className="w-full h-auto"
        />
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading LeetCode Stats...</p>
      )}
    </Flex>
  );
}
