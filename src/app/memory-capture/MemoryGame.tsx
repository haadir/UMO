"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SaveToGalleryButton from "./SaveToGalleryButton";

export default function MemoryGame({ transcript }: { transcript: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gameCount, setGameCount] = useState(0);
  const router = useRouter();

  const generateGame = async () => {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/memory-game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
    });
    if (!res.ok) {
      setError(
        "Sorry, there was a problem generating the memory game. Please try again."
      );
      setLoading(false);
      return;
    }
    const data = await res.json();
    setLoading(false);
    setGameCount((c) => c + 1);
    // Redirect to /memory-game with game data as query params
    const params = new URLSearchParams({
      question: data.question,
      imageUrl: data.imageUrl,
      answers: JSON.stringify(data.answers),
      correct: data.correct,
    });
    router.push(`/memory-game?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="text-center text-[#6B4EFF] font-bold mt-4">
        Generating game...
      </div>
    );
  }

  return (
    <>
      {/* Save to Gallery Button appears if transcript exists */}
      {transcript && <SaveToGalleryButton transcript={transcript} />}
      <button
        className="w-full bg-[#B9AFFF] text-[#18114B] font-bold py-3 rounded-lg text-lg mt-4"
        onClick={generateGame}
      >
        Generate Memory Game
      </button>
      {gameCount > 0 && (
        <button
          className="w-full bg-[#6B4EFF] text-white font-bold py-3 rounded-lg text-lg mt-4"
          onClick={generateGame}
        >
          Next
        </button>
      )}
      {error && (
        <div className="text-center text-red-500 font-bold mt-4">{error}</div>
      )}
    </>
  );
}
