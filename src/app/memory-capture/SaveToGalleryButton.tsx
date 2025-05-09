"use client";
import { useState } from "react";
import { saveMemory, Memory } from "./MemoryGalleryUtils";

export default function SaveToGalleryButton({
  transcript,
}: {
  transcript: string;
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    // Generate image for the story
    const dallePrompt = `A painting/sketch illustration for the story: "${transcript}". Artistic, gentle, memory-jogging.`;
    const res = await fetch("/api/memory-game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
    });
    if (!res.ok) {
      setError("Failed to generate image for memory.");
      setLoading(false);
      return;
    }
    const data = await res.json();
    const imageUrl = data.imageUrl;
    // Save memory
    const memory: Memory = {
      id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      transcript,
      imageUrl,
      title: transcript.split(". ")[0] || transcript.slice(0, 32),
      date: new Date().toISOString(),
    };
    saveMemory(memory);
    setLoading(false);
    setSuccess(true);
    // Optionally, navigate to gallery here
    // router.push("/memory-gallery");
  };

  return (
    <div className="flex flex-col items-center w-full mt-4">
      <button
        className="w-full bg-[#B9AFFF] text-[#18114B] font-bold py-3 rounded-lg text-lg mt-2 disabled:opacity-50"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save to Memory Gallery"}
      </button>
      {success && (
        <div className="text-green-600 font-bold mt-2">Saved to gallery!</div>
      )}
      {error && <div className="text-red-500 font-bold mt-2">{error}</div>}
    </div>
  );
}
