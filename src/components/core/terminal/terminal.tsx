"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { X, Minus, Maximize2, TerminalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TerminalProps {
  className?: string;
  welcomeMessage?: string;
  prompt?: string;
  initialCommands?: { command: string; output: string }[];
}

export function Terminal({
  className,
  welcomeMessage = "Welcome to Terminal v1.1.0",
  prompt = "user@localhost:~$",
  initialCommands = [],
}: TerminalProps) {
  const [commands, setCommands] = useState<{ command: string; output: string }[]>(initialCommands);
  const [currentCommand, setCurrentCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  const executeCommand = (cmd: string): string => {
    if (cmd === "clear") {
      setCommands([]);
      return "";
    }
    switch (cmd) {
      case "help":
        return "Available commands: clear, help, echo <text>, date, whoami, ls, pwd, uptime";
      case "date":
        return new Date().toLocaleString();
      case "whoami":
        return "user";
      case "ls":
        return "Documents  Downloads  Music  Pictures  Videos";
      case "pwd":
        return "/home/user";
      case "uptime":
        return "System uptime: 5 hours 23 minutes";
      default:
        return cmd.startsWith("echo ") ? cmd.slice(5) : `Command '${cmd}' not recognized.`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    const output = executeCommand(currentCommand);
    if (currentCommand !== "clear") {
      setCommands([...commands, { command: currentCommand, output }]);
    }
    setHistory([currentCommand, ...history]);
    setCurrentCommand("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp" && history.length > 0 && historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentCommand(history[historyIndex + 1]);
    } else if (e.key === "ArrowDown" && historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentCommand(history[historyIndex - 1]);
    } else if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    terminalRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [commands]);

  return (
    <Card className={cn("border border-border bg-black opacity-90 shadow-lg", className)}>
      <CardHeader className="flex justify-between bg-zinc-900 px-4 py-2">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4 text-green-400" />
          <span className="text-sm font-medium text-white">Terminal</span>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          {[X, Minus, Maximize2].map((Icon, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-400 hover:bg-zinc-700">
                    <Icon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{Icon === X ? "Close" : Icon === Maximize2 ? "Maximize" : "Minimize"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-4 py-2 text-sm font-mono bg-black text-white" onClick={handleTerminalClick}>
          <p className="text-green-400">{welcomeMessage}</p>
          {commands.map((cmd, index) => (
            <div key={index} className="mt-2">
              <span className="text-green-400">{prompt} </span>
              <span>{cmd.command}</span>
              <div className="text-zinc-300">{cmd.output}</div>
            </div>
          ))}
          <form onSubmit={handleSubmit} className="flex items-center mt-2">
            <span className="text-green-400">{prompt} </span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none ml-2 caret-green-400"
              autoFocus
              placeholder="Type a command"
            />
            <span className="animate-pulse text-white">|</span>
          </form>
        </ScrollArea>
      </CardContent>
    </Card>

  );
}
