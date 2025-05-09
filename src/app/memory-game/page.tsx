"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function MemoryGamePage() {
  const router = useRouter();
  const [query, setQuery] = useState({
    question: "",
    imageUrl: "",
    answers: [],
    correct: "",
    transcript: "",
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setQuery({
        question: params.get("question") || "",
        imageUrl: params.get("imageUrl") || "",
        answers: (() => {
          try {
            return JSON.parse(params.get("answers") || "[]");
          } catch {
            return [];
          }
        })(),
        correct: params.get("correct") || "",
        transcript:
          params.get("transcript") ||
          (typeof window !== "undefined"
            ? localStorage.getItem("umo_last_transcript") || ""
            : ""),
      });
      // Save transcript to localStorage for next/refresh
      if (params.get("transcript")) {
        localStorage.setItem("umo_last_transcript", params.get("transcript")!);
      }
    }
  }, [typeof window !== "undefined" ? window.location.search : ""]);
  const question = query.question;
  const imageUrl = query.imageUrl;
  const answers = query.answers as string[];
  const correct = query.correct;
  const transcript = query.transcript;
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = async () => {
    if (!transcript) {
      console.log("No transcript found. Cannot generate next question.");
      setError("Cannot generate next question: transcript missing.");
      return;
    }
    console.log("Calling API to generate new image and question...");
    setLoading(true);
    setError(null);
    const res = await fetch("/api/memory-game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
    });
    if (!res.ok) {
      setError(
        "Sorry, there was a problem generating the next question. Please try again."
      );
      setLoading(false);
      return;
    }
    const data = await res.json();
    setLoading(false);
    const params = new URLSearchParams({
      question: data.question,
      imageUrl: data.imageUrl,
      answers: JSON.stringify(data.answers),
      correct: data.correct,
      transcript: transcript,
    });
    router.replace(`/memory-game?${params.toString()}`);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#18114B] via-[#3a3a6a] to-[#c3defa]">
      <main
        className="bg-[#C3DEFA] w-full max-w-[393px] max-h-[900px] min-h-[700px] rounded-[2.5rem] shadow-2xl flex flex-col px-4 pt-4 pb-0 mx-auto relative"
        style={{ minHeight: 700 }}
      >
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#C3DEFA]/80 rounded-[2.5rem]">
            <div className="w-12 h-12 border-4 border-[#6B4EFF] border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-[#6B4EFF] font-bold text-lg">
              Loading next question...
            </div>
          </div>
        )}
        {/* Top bar */}
        <div className="flex w-full items-center justify-between mb-2">
          <button
            className="p-2 rounded-lg bg-white border-2 border-[#18114B] cursor-pointer"
            onClick={() => {
              if (router && router.push) {
                router.push("/home");
              } else {
                window.location.href = "/home";
              }
            }}
            type="button"
          >
            <span className="text-xl text-[#18114B]">←</span>
          </button>
          <div
            className="text-xl font-bold text-[#18114B] text-center flex-1 -ml-8"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Memory Game
          </div>
          <div className="w-10" />
        </div>
        {/* Question */}
        <div className="flex flex-col items-center w-full mt-2 mb-4">
          <div
            className="text-xl font-bold text-center text-[#18114B] mb-4 leading-snug"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            {question}
          </div>
        </div>
        {/* Image */}
        {imageUrl && (
          <div className="flex justify-center mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Memory Game"
              className="rounded-xl w-full max-w-xs shadow-lg"
              style={{ aspectRatio: "1/1" }}
            />
          </div>
        )}
        {/* Options */}
        <div className="flex flex-col gap-4 w-full max-w-xs mx-auto mt-2">
          {answers.map((ans: string) => (
            <button
              key={ans}
              className={`w-full py-4 rounded-2xl border-2 flex items-center justify-center text-lg font-bold transition-all cursor-pointer
                ${
                  selected === ans
                    ? ans === correct
                      ? "border-green-500 bg-green-100"
                      : "border-red-500 bg-red-100"
                    : "border-[#18114B] bg-white"
                }
                ${selected && ans === correct ? "ring-2 ring-green-300" : ""}
              `}
              style={{ fontFamily: "var(--font-fredoka)", color: "#18114B" }}
              onClick={() => setSelected(ans)}
              disabled={!!selected}
              type="button"
            >
              {ans}
            </button>
          ))}
        </div>
        {/* Feedback */}
        {selected && (
          <div className="mt-6 text-lg font-bold text-center text-[#18114B]">
            {selected === correct ? "Correct!" : `Correct answer: ${correct}`}
          </div>
        )}
        {/* Next Button and Error */}
        <div className="flex flex-col items-center w-full mt-6">
          <button
            className="w-full max-w-xs bg-[#6B4EFF] text-white font-bold py-3 rounded-lg text-lg mt-2 disabled:opacity-50 cursor-pointer"
            style={{ fontFamily: "var(--font-fredoka)" }}
            onClick={handleNext}
            disabled={loading || !transcript}
            type="button"
          >
            Next
          </button>
          {error && (
            <div className="text-center text-red-500 font-bold mt-2">
              {error}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
