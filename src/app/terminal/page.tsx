import { Terminal } from "@/components/core/terminal/terminal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 opacity-90 ">
      <div className="w-full space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">
            Interactive Terminal
          </h1>
        </div>

        <Terminal />
      </div>
    </main>
  );
}
