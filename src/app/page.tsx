"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#18114B] via-[#3a3a6a] to-[#c3defa]">
      <main
        className="bg-[#C3DEFA] w-full h-full max-w-[393px] max-h-[853px] rounded-[2.5rem] shadow-2xl flex flex-col items-center px-4 py-6 mx-auto
        sm:my-8 sm:h-auto sm:rounded-[2.5rem] sm:shadow-2xl"
        style={{ minHeight: "600px" }}
      >
        {/* Top Spacing for status bar */}
        <div className="h-6 w-full" />
        {/* Welcome Text */}
        <h1
          className="text-[1.7rem] font-bold text-center mb-2 text-[#18114B]"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Welcome to
        </h1>
        {/* UMO Logo (larger) */}
        <Image
          src="/umo-logo.svg"
          alt="UMO logo"
          width={150}
          height={150}
          className="mb-2"
        />
        {/* Subtitle */}
        <div
          className="text-lg font-bold text-center mb-4 text-[#18114B] leading-tight"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          The AI-driven App
          <br />
          for Your Memories
        </div>
        {/* Section Prompt */}
        <div
          className="text-base font-bold text-center mb-4 text-[#18114B]"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Select how you'll be using the app:
        </div>
        {/* Buttons */}
        <div className="flex flex-col gap-5 w-full">
          {/* Sign Up Button */}
          <button
            className="bg-white border border-[#18114B] rounded-2xl py-4 px-2 flex flex-col items-center shadow-md hover:bg-[#e6f0fa] transition w-full"
            onClick={() => router.push("/onboarding/name")}
          >
            <span
              className="text-lg font-bold text-[#18114B] mb-2"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Sign Up
            </span>
            <Image
              src="/icons/signup-icon.svg"
              alt="Sign Up Icon"
              width={48}
              height={48}
              className="mb-2"
            />
            <span
              className="text-base text-[#18114B] font-normal leading-tight"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Create an account
              <br />
              as a new user
            </span>
          </button>
          {/* Login Button */}
          <button
            className="bg-white border border-[#18114B] rounded-2xl py-4 px-2 flex flex-col items-center shadow-md hover:bg-[#e6f0fa] transition w-full"
            onClick={() => router.push("/onboarding/name")}
          >
            <span
              className="text-lg font-bold text-[#18114B] mb-2"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Login
            </span>
            <Image
              src="/icons/login-icon.svg"
              alt="Login Icon"
              width={48}
              height={48}
              className="mb-2"
            />
            <span
              className="text-base text-[#18114B] font-normal leading-tight"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              Already have
              <br />
              an account
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
