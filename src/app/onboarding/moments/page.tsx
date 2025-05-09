"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const momentsList = [
  "Family gatherings",
  "Childhood memories",
  "Favorite hobbies",
  "Travel experiences",
];

export default function MomentsStep() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  function toggleMoment(moment: string) {
    setSelected((sel) =>
      sel.includes(moment) ? sel.filter((m) => m !== moment) : [...sel, moment]
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#18114B] via-[#3a3a6a] to-[#c3defa]">
      <main className="bg-[#C3DEFA] w-full h-full max-w-[393px] max-h-[853px] min-h-[600px] rounded-[2.5rem] shadow-2xl flex flex-col items-center px-4 py-6 mx-auto">
        <div className="h-6 w-full flex items-center">
          <button onClick={() => router.back()} className="ml-2">
            <span className="text-2xl text-[#18114B]">←</span>
          </button>
        </div>
        <Image
          src="/umo-logo.svg"
          alt="UMO logo"
          width={120}
          height={120}
          className="mb-2"
        />
        <h2
          className="text-lg font-bold text-center mb-4 text-[#18114B]"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Let's personalize your experience.
          <br />
          What are some key moments you want to revisit?
        </h2>
        <div className="flex flex-col gap-3 w-full max-w-xs mb-4">
          {momentsList.map((moment) => (
            <button
              key={moment}
              className={`w-full py-3 rounded-lg border border-[#18114B] text-[#18114B] font-bold text-base transition ${
                selected.includes(moment) ? "bg-[#B9AFFF]" : "bg-white"
              }`}
              style={{ fontFamily: "var(--font-fredoka)" }}
              onClick={() => toggleMoment(moment)}
              type="button"
            >
              {moment}
            </button>
          ))}
        </div>
        <button
          className="w-full max-w-xs bg-[#B9AFFF] text-[#18114B] font-bold py-3 rounded-lg text-lg mt-2 disabled:opacity-50"
          style={{ fontFamily: "var(--font-fredoka)" }}
          disabled={selected.length === 0}
          onClick={() => router.push("/onboarding/add-people")}
        >
          Continue
        </button>
      </main>
    </div>
  );
}
