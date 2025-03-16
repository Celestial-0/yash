"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import "./terminal.scss";

type TextLine = { text: string; class?: string; bold?: boolean };
type LineOut = TextLine | JSX.Element;

const facts = (
  <>
    <p className="has-text-weight-bold">Hey there! I&apos;m Yash 👋</p>
    <br />
    <p>Here&apos;s a bit about me:</p>
    <ul>
      <li className="is-rainbow-red">✅ Full-Stack Developer 💻</li>
      <li className="is-rainbow-orange">✅ AI/ML Enthusiast 🤖</li>
      <li className="is-rainbow-yellow">✅ Anime & Manga Addict 📖🎌</li>
      <li className="is-rainbow-green">✅ Hardcore Gamer 🎮</li>
      <li className="is-rainbow-blue">✅ Open-World RPGs are my escape 🌍</li>
      <li className="is-rainbow-violet">✅ Always up for a strategy game ♟️</li>
    </ul>
    <br />
  </>
);

const getCommandOptions = (input: string): string[] => {
  const options: string[] = [];
  input.split(" ").forEach((token) => {
    if (token.startsWith("--")) {
      options.push(token.slice(2));
    } else if (token.startsWith("-") && !token.startsWith("--")) {
      options.push(...token.slice(1).split(""));
    }
  });
  return options;
};

interface CommandProps {
  input: string[];
  output: LineOut[];
  setOutput: React.Dispatch<React.SetStateAction<LineOut[]>>;
}

const commands: { [key: string]: (props: CommandProps) => void } = {
  hello: ({ input, setOutput }) => {
    if (input[0] === "--help") {
      setOutput((prev) => [
        ...prev,
        { text: "Hello command", bold: true },
        { text: "returns a greeting" },
        { text: "hello [name]" },
        { text: "" },
        { text: 'hello Ritik: returns "Hello Ritik"' },
      ]);
      return;
    }
    setOutput((prev) => [...prev, { text: `Hello! ${input[0] || ""}` }]);
  },
  commands: ({ setOutput }) => {
    setOutput((prev) => [
      ...prev,
      { text: "Commands available:", bold: true },
      { text: " " },
      ...Object.keys(commands).map((key) => ({ text: key })),
    ]);
  },
  echo: ({ input, setOutput }) =>
    setOutput((prev) => [...prev, { text: input.join(" ") }]),
  kill: ({ setOutput }) =>
    setOutput((prev) => [
      ...prev,
      { text: "goodbye cruel world! 💀", class: "is-rainbow-red" },
      <Image
        key="kill-img"
        src="https://media.giphy.com/media/uC8SQoaY5EHhC/giphy.gif"
        alt="Animated goodbye gif"
        width={500}
        height={500}
      />,
    ]),
  clear: ({ setOutput }) => {
    setOutput([]);
  },
  facts: ({ setOutput }) => {
    setOutput((prev) => [...prev, facts]);
  },
  ls: ({ input, setOutput }) => {
    const options = getCommandOptions(input.join(" "));
    const results = ["/.", "/.."];
    if (options.includes("a")) results.push(".cv.json");
    if (options.includes("l")) {
      setOutput((prev) => [...prev, ...results.map((r) => ({ text: r }))]);
    } else {
      setOutput((prev) => [...prev, { text: results.join(" ") }]);
    }
  },
  celestial: ({ input, setOutput }) => {
    if (input[0] === ".cv.json") {
      setOutput((prev) => [
        ...prev,
        { text: "you discovered my secret :O" },
        <a
          key="cv-link"
          target="_blank"
          href="/api/cv"
        >
          View my CV
        </a>,
      ]);
    }
  },
  git: ({ setOutput }) =>
    setOutput((prev) => [...prev, { text: "Bit rude..." }]),
  ssh: ({ setOutput }) =>
    setOutput((prev) => [
      ...prev,
      {
        text: "Hmm, trying to SSH into CSS? Not gonna work—I'm just a meticulously crafted HTML terminal window here to serve up code, not to be hacked. Nice try, but you'll have to find another way around these defenses! 🙃",
      },
    ]),
  hacker: ({ setOutput }) =>
    setOutput((prev) => [
      ...prev,
      {
        text: "This is what my girlfriend says I look like. Don't know why, I don't code with bananas 🤷‍♀️",
      },
      <Image
        key="hacker-img"
        src="https://media.giphy.com/media/YQitE4YNQNahy/giphy.gif"
        alt="Animated hacker gif"
        width={500}
        height={500}
      />,
    ]),
    info: ({ setOutput }) => {
        setOutput((prev) => [
          ...prev,
          <h1 key="info-title" className="title is-rainbow-text">
            Info
          </h1>,
          <h3 key="info-subtitle" className="subtitle">
            Version 1.0.0
          </h3>,
          {
            text: "This little terminal window I built in a few hours (at 2am like a true programmer)",
            class: "is-rainbow-red",
          },
          <p key="info-1" className="is-rainbow-orange">
            Was pretty fun! Thinking of open sourcing the terminal design and input,{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Celestial-0/yash"
            >
              click here to check out the repo if you want!
            </a>
          </p>,
          <p key="info-2" className="is-rainbow-yellow">
            To find out more about me, <a href="/#about">Click here</a>
          </p>,
          <p key="info-3" className="is-rainbow-green">
            To view my current projects and work <a href="/#projects">Click here</a>
          </p>,
          <p key="info-4" className="is-rainbow-blue">
            To get in contact{" "}
            <a href="#" onClick={() => { window.location.href = "/#contact"; }}>
              Click here
            </a>
          </p>,
        ]);
      },
      
  contact: ({ setOutput }) => {
    setOutput((prev) => [
      ...prev,
      {
        text: "Opening contact window on port 3000...",
        class: "is-rainbow-green",
      },
    ]);
    setTimeout(() => {
      window.location.href = "/#contact";
    }, 1500);
  },
  
};

const isJsxElement = (value: LineOut): value is JSX.Element =>
  React.isValidElement(value);

export const Terminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<LineOut[]>([
    facts,
    <p key="info-text" className="text-info">
      Type &quot;commands&quot; into the terminal window and hit enter to see
      all commands
    </p>,
  ]);
  const [commandExists, setCommandExists] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [cursorLeft, setCursorLeft] = useState(15);

  const inputElement = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);

  // Update cursor position whenever the input changes
  useEffect(() => {
    if (mirrorRef.current) {
      const width = mirrorRef.current.offsetWidth;
      setCursorLeft(width + 15); // 15px padding/offset adjustment
    }
  }, [input]);

  const runCommand = useCallback(
    (commandInput: string) => {
      if (commandInput.trim() === "") {
        setOutput((prev) => [...prev, { text: "" }]);
        return;
      }
      const tokens = commandInput.split(" ");
      if (!tokens[0] || !commands[tokens[0]]) {
        setOutput((prev) => [
          ...prev,
          { text: `command: "${tokens[0]}" not found` },
        ]);
        return;
      }
      setOutput((prev) => [
        ...prev,
        { text: `❯ ${commandInput}`, class: "is-rainbow-green" },
      ]);
      const cmd = tokens.shift();
      if (cmd) {
        commands[cmd]({ input: tokens, output, setOutput });
      }
    },
    [output]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      // Add the current command to history
      setTerminalHistory((prev) => [...prev, input]);
      // Reset history index when a new command is executed
      setHistoryIndex(null);
      runCommand(input);
      setInput("");
    },
    [input, runCommand]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const cmd = value.split(" ")[0];
      setCommandExists(!!(cmd && commands[cmd]));
      setInput(value);
    },
    []
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowUp") {
        // If no history index is set, start with the last command
        const newIndex =
          historyIndex === null
            ? terminalHistory.length - 1
            : Math.max(historyIndex - 1, 0);
        if (terminalHistory[newIndex] !== undefined) {
          setHistoryIndex(newIndex);
          setInput(terminalHistory[newIndex]);
        }
      } else if (event.key === "ArrowDown") {
        if (historyIndex !== null) {
          const newIndex = Math.min(historyIndex + 1, terminalHistory.length);
          if (newIndex === terminalHistory.length) {
            // Beyond the last history item, clear the input
            setHistoryIndex(null);
            setInput("");
          } else {
            setHistoryIndex(newIndex);
            setInput(terminalHistory[newIndex]);
          }
        }
      }
    },
    [historyIndex, terminalHistory]
  );

  const handleFocus = useCallback(() => {
    inputElement.current?.focus();
  }, []);

  return (
    <div id="terminal" className="w-full">
      <header className="terminal-header">
        <div className="terminal-header-buttons">
          <div className="terminal-button close"></div>
          <div className="terminal-button minimise"></div>
          <div className="terminal-button expand"></div>
        </div>
      </header>
      <div className="terminal-body" onClick={handleFocus}>
        {output.map((line, index) =>
          isJsxElement(line) ? (
            <div key={`output-line-${index}`}>{line}</div>
          ) : (
            <p
              key={`output-line-${index}`}
              className={`${line.class ? line.class : ""} ${
                line.bold ? "has-text-bold" : ""
              }`.trim()}
            >
              {line.text}
            </p>
          )
        )}
        <br />
        <div className="terminal-control">
          <form className="terminal-input" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">~</label>
              <div
                className="control has-icons-left"
                style={{ position: "relative" }}
              >
                <span className="icon is-left">❯</span>
                <input
                  className={`input${commandExists ? " command-exists" : ""}`}
                  autoCorrect="off"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoFocus
                  title="Terminal Input"
                  placeholder="Type a command"
                  onChange={handleChange}
                  value={input}
                  ref={inputElement}
                  onKeyUp={handleKeyUp}
                  style={{ fontFamily: "monospace" }}
                />
                {/* Hidden mirror element to measure text width */}
                <span
                  ref={mirrorRef}
                  className="input-mirror"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    visibility: "hidden",
                    whiteSpace: "pre",
                    fontFamily: "monospace",
                    fontSize: "inherit",
                    padding: "inherit",
                    border: "inherit",
                  }}
                >
                  {input}
                </span>
                {/* Custom cursor positioned based on mirror width */}
                <span
                  className="cursor"
                  style={{ left: `${cursorLeft}px` }}
                ></span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <nav className="terminal-tmux-bar">
        <div className="screen">0</div>
        <div className="bar">zsh</div>
        <div className="battery">&hearts; 100%</div>
        <div className="name">Yash&apos;s Laptop</div>
      </nav>
    </div>
  );
};
