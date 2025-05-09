"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const options = [
  { src: "/option1.png", alt: "Hermione" },
  { src: "/option2.png", alt: "Ron" },
  { src: "/option3.png", alt: "Ron (younger)" },
  { src: "/option4.png", alt: "Hermione (younger)" },
];

export default function MemoQuestPage() {
  const router = useRouter();
  const [hintShown, setHintShown] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);

  // For demo: correct answer is option2 (top right)
  const correctIndexes = [1];
  const hintIndexes = [1, 2]; // top right and bottom left

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#18114B] via-[#3a3a6a] to-[#c3defa]">
      <main
        className="bg-[#C3DEFA] w-full max-w-[393px] max-h-[900px] min-h-[700px] rounded-[2.5rem] shadow-2xl flex flex-col px-4 pt-4 pb-0 mx-auto relative"
        style={{ minHeight: 700 }}
      >
        {/* Top bar */}
        <div className="flex w-full items-center justify-between mb-2">
          <button
            className="p-2 rounded-lg bg-white border-2 border-[#18114B] cursor-pointer"
            onClick={() => router.push("/home")}
          >
            <span className="text-xl text-[#18114B]">←</span>
          </button>
          <div
            className="text-xl font-bold text-[#18114B] text-center flex-1 -ml-8"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            MemoQuest
          </div>
          <button className="p-2 rounded-lg bg-white border-2 border-[#18114B] cursor-pointer">
            <span className="text-xl text-[#18114B]">?</span>
          </button>
        </div>
        {/* Progress bar (3 dots) */}
        <div className="flex flex-row justify-center items-center gap-2 mb-2 mt-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 border-[#18114B] ${
                i === 0 ? "bg-[#6B4EFF]" : "bg-white"
              }`}
            />
          ))}
        </div>
        {/* Question */}
        <div
          className="text-lg font-bold text-center text-[#18114B] mb-2"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Match your grandchildren!
        </div>
        {/* Image grid */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs mx-auto mb-2">
          {options.map((opt, i) => (
            <button
              key={opt.src}
              className={`rounded-xl overflow-hidden border-4 w-full aspect-square flex items-center justify-center transition-all
                ${
                  hintShown && hintIndexes.includes(i)
                    ? "border-[#FF5C5C] bg-[#FFF0F0]"
                    : selected === i
                    ? correctIndexes.includes(i)
                      ? "border-green-500 bg-green-100"
                      : "border-red-500 bg-red-100"
                    : "border-[#18114B] bg-white"
                }
              `}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelected(i);
                setShowCorrect(true);
              }}
              disabled={showCorrect}
            >
              <Image
                src={opt.src}
                alt={opt.alt}
                width={100}
                height={100}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
        {/* Timer and Hint */}
        <div className="flex flex-row items-center justify-between w-full max-w-xs mx-auto mb-2">
          <div className="text-base text-[#18114B] font-bold">
            {hintShown ? "20 sec" : "10 sec"}
          </div>
          <button
            className="flex-1 ml-2 bg-[#E3D6FF] border-2 border-[#6B4EFF] rounded-lg py-2 px-4 text-base font-bold text-[#6B4EFF] flex items-center justify-center cursor-pointer"
            onClick={() => setHintShown(true)}
            disabled={hintShown}
          >
            ✨Hint
          </button>
        </div>
        {/* Hint/Feedback */}
        {hintShown && !showCorrect && (
          <div className="w-full max-w-xs mx-auto bg-white border-2 border-[#6B4EFF] rounded-lg px-4 py-3 text-center text-base text-[#6B4EFF] font-bold mb-2">
            Ron has red hair!
          </div>
        )}
        {showCorrect && selected !== null && (
          <div className="w-full max-w-xs mx-auto bg-white border-2 border-green-500 rounded-lg px-4 py-3 text-center text-base text-green-600 font-bold mb-2 flex items-center justify-center gap-2">
            <span role="img" aria-label="party">
              🎉
            </span>{" "}
            Correct! Ron is the 2nd oldest
          </div>
        )}
        {/* Bottom Navigation */}
        <div className="mt-auto">
          {/* You can import BottomNav here if needed */}
        </div>
      </main>
    </div>
  );
}
