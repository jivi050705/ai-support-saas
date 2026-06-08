"use client";
import { useState, useEffect } from "react";

type Ticket = {
  id: string;
  session_id: string;
  issue: string;
  status: string;
  created_at: string;
};

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploadMsg, setUploadMsg] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/tickets/")
      .then((res) => res.json())
      .then(setTickets);
  }, []);

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://127.0.0.1:8000/api/knowledge/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setUploadMsg(data.message);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Knowledge Upload */}
      <section className="bg-gray-900 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload Knowledge Base</h2>
        <div className="flex gap-3 items-center">
          <input
            type="file"
            accept=".txt,.pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm text-gray-400"
          />
          <button
            onClick={uploadFile}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Upload
          </button>
        </div>
        {uploadMsg && <p className="mt-3 text-green-400 text-sm">{uploadMsg}</p>}
      </section>

      {/* Tickets Table */}
      <section className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Support Tickets</h2>
        {tickets.length === 0 ? (
          <p className="text-gray-500 text-sm">No tickets yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="text-left py-2">Issue</th>
                <th className="text-left py-2">Session</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="border-b border-gray-800">
                  <td className="py-2">{t.issue}</td>
                  <td className="py-2 text-gray-400">{t.session_id}</td>
                  <td className="py-2">
                    <span className="bg-yellow-600 px-2 py-1 rounded text-xs">{t.status}</span>
                  </td>
                  <td className="py-2 text-gray-400">{new Date(t.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}