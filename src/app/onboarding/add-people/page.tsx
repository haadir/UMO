"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddPeopleStep() {
  const router = useRouter();
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
          className="text-lg font-bold text-center mb-8 text-[#18114B]"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Would you like to add family/
          <br />
          friends to help us with memory prompts?
        </h2>
        <div className="flex flex-col gap-4 w-full max-w-xs mb-4">
          <button
            className="w-full py-3 rounded-lg border border-[#18114B] text-[#18114B] font-bold text-base bg-white"
            style={{ fontFamily: "var(--font-fredoka)" }}
            onClick={() => router.push("/onboarding/accessibility")}
          >
            Yes, add family or friends
          </button>
          <button
            className="w-full py-3 rounded-lg border border-[#18114B] text-[#18114B] font-bold text-base bg-[#B9AFFF]"
            style={{ fontFamily: "var(--font-fredoka)" }}
            onClick={() => router.push("/onboarding/accessibility")}
          >
            Skip for now
          </button>
        </div>
      </main>
    </div>
  );
}
