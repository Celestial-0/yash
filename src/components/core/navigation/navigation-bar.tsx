"use client";

import { Dock, DockIcon } from "@/components/magicui/dock";
import { Flex, IconButton, Separator, Tooltip } from "@radix-ui/themes";
import {
  FaHouse,
  FaFolderOpen,
  FaGithub,
  FaLinkedin,
  FaTerminal,
} from "react-icons/fa6";
import { IoSunny, IoMoon } from "react-icons/io5";
import { NavigationLink } from "./navigation-link";
import { useTheme } from "next-themes";
import { SiLeetcode } from "react-icons/si";


export const NavigationBar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Flex className={"z-50 bottom-0 fixed w-full pointer-events-none"}>
      <Dock
        direction={"middle"}
        className={
          "rounded-full bg-[--color-panel] !gap-0 mb-8 pointer-events-auto"
        }
      >
        <DockIcon>
          <NavigationLink href={"/"} label={"Home"}>
            <FaHouse size={"1.10rem"} />
          </NavigationLink>
        </DockIcon>
        <DockIcon>
          <NavigationLink href={"/terminal"} label={"Terminal"}>
            <FaTerminal size={"1.10rem"} />
          </NavigationLink>
        </DockIcon>
        <DockIcon>
          <NavigationLink href={"/#projects"} label={"Projects"}>
            <FaFolderOpen size={"1.10rem"} />
          </NavigationLink>
        </DockIcon>
        <Separator orientation={"vertical"} size={"4"} />
        <DockIcon>
          <NavigationLink
            href={"https://github.com/Celestial-0"}
            label={"GitHub"}
          >
            <FaGithub size={"1.10rem"} />
          </NavigationLink>
        </DockIcon>
        <DockIcon>
          <NavigationLink
            href={"https://leetcode.com/u/Celestial-0/"}
            label={"LeetCode"}
          >
            <SiLeetcode size={"1.10rem"} />
          </NavigationLink>
        </DockIcon>
        <DockIcon>
          <NavigationLink
            href={"https://www.linkedin.com/in/celestial0/"}
            label={"LinkedIn"}
          >
            <FaLinkedin size={"1.10rem"} />
          </NavigationLink>
        </DockIcon>
        <Separator orientation={"vertical"} size={"4"} />
        <DockIcon>
          <Tooltip content={"Appearance"}>
            <IconButton
              color={"gray"}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              radius={"full"}
            >
              {theme === "light" ? (
                <IoSunny size={"1.10rem"} />
              ) : (
                <IoMoon size={"1.10rem"} />
              )}
            </IconButton>
          </Tooltip>
        </DockIcon>
      </Dock>
    </Flex>
  );
};
