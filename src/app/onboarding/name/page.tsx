"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NameStep() {
  const router = useRouter();
  const [name, setName] = useState("");
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
          className="text-xl font-bold text-center mb-4 text-[#18114B]"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          What is your name?
        </h2>
        <input
          className="w-full max-w-xs rounded-lg border border-[#18114B] px-4 py-2 mb-4 text-lg text-[#18114B] font-bold bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4EFF]"
          style={{ fontFamily: "var(--font-fredoka)" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <button
          className="w-full max-w-xs bg-[#B9AFFF] text-[#18114B] font-bold py-3 rounded-lg text-lg mt-2 disabled:opacity-50"
          style={{ fontFamily: "var(--font-fredoka)" }}
          disabled={!name}
          onClick={() => router.push("/onboarding/moments")}
        >
          Continue
        </button>
      </main>
    </div>
  );
}
