import { Terminal } from "@/components/core/terminal/terminal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 opacity-100 ">
      <div className="w-full max-w-3xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">
            Interactive Terminal
          </h1>
        </div>

        <Terminal welcomeMessage="Welcome to the Interactive Terminal! Type 'help' to see available commands." />

        <div className="rounded-lg border p-4 bg-muted/50">
          <h3 className="font-medium mb-2">Usage Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Click anywhere in the terminal to focus</li>
            <li>• Use up/down arrows to navigate command history</li>
            <li>• Try typing &apos;help&apos; to see available commands</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
