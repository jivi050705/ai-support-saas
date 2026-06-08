import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold mb-4 text-center">
        AI Customer Support
      </h1>
      <p className="text-gray-400 text-lg mb-8 text-center max-w-xl">
        Instant answers powered by your knowledge base. No wait times, no tickets — just solutions.
      </p>
      <div className="flex gap-4">
        <Link
          href="/chat"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
        >
          Start Chat
        </Link>
        <Link
          href="/dashboard"
          className="border border-gray-600 hover:border-gray-400 px-6 py-3 rounded-lg font-semibold transition"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}