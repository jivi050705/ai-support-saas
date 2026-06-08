"use client";
import { useState } from "react";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: "user123", message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "bot", text: "Error connecting to server." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">AI Support Chat</h1>
      <div className="w-full max-w-2xl bg-gray-900 rounded-xl p-4 flex flex-col gap-3 min-h-[400px] max-h-[500px] overflow-y-auto mb-4">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center mt-20">Ask me anything...</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-lg max-w-[75%] text-sm ${msg.role === "user" ? "bg-blue-600" : "bg-gray-700"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-lg bg-gray-700 text-sm text-gray-400">Thinking...</div>
          </div>
        )}
      </div>
      <div className="w-full max-w-2xl flex gap-2">
        <input
          className="flex-1 bg-gray-800 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
        >
          Send
        </button>
      </div>
    </main>
  );
}