"use client";
import Image from "next/image";
import {
  ArrowLeft,
  HelpCircle,
  Home,
  Image as ImageIcon,
  Mic,
  Puzzle,
  Cog,
  Pause,
} from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "../components/BottomNav";
import { useWhisperTranscription } from "./useWhisperTranscription";
import MemoryGame from "./MemoryGame";
import { useState } from "react";

export default function MemoryCapturePage() {
  const router = useRouter();
  const { recording, transcript, loading, startRecording, stopRecording } =
    useWhisperTranscription();

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
            <ArrowLeft className="w-6 h-6 text-[#18114B]" />
          </button>
          <div
            className="text-xl font-bold text-[#18114B] text-center flex-1 -ml-8"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Memory Capture
          </div>
          <button className="p-2 rounded-lg bg-white border-2 border-[#18114B] cursor-pointer">
            <HelpCircle className="w-6 h-6 text-[#18114B]" />
          </button>
        </div>
        {/* AI Prompt */}
        <div className="flex flex-col items-center w-full mt-2 mb-4">
          <div
            className="text-base font-bold text-[#18114B] mb-1"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Hi, Gerald
          </div>
          <div
            className="text-2xl font-bold text-center text-[#18114B] mb-4 leading-snug"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Who was your best friend
            <br />
            growing up, and what
            <br />
            adventures did you share?
          </div>
        </div>
        {/* Speech Visual */}
        <div className="flex flex-col items-center justify-center flex-1">
          <Image
            src="/Speech.svg"
            alt="Speech Visual"
            width={280}
            height={280}
            className="mx-auto"
          />
        </div>
        {/* Live Transcript */}
        <div className="flex flex-col items-center w-full mb-2 min-h-[48px]">
          {loading ? (
            <span className="text-[#6B4EFF] font-bold animate-pulse">
              Transcribing...
            </span>
          ) : transcript ? (
            <span className="text-[#18114B] font-bold text-lg text-center">
              {transcript}
            </span>
          ) : recording ? (
            <span className="text-[#6B4EFF] font-bold animate-pulse">
              Listening...
            </span>
          ) : null}
        </div>
        {/* Memory Game Button and UI */}
        {transcript && !loading && <MemoryGame transcript={transcript} />}
        {/* Bottom Navigation with mic control */}
        <BottomNav onMicClick={recording ? stopRecording : startRecording} />
        {/* Overlay pause or mic icon on the mic button */}
        <style jsx global>{`
          button.bg-\[\#E3D6FF\] > img {
            display: none;
          }
          button.bg-\[\#E3D6FF\] {
            position: relative;
          }
        `}</style>
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 24,
            transform: "translateX(-50%)",
            pointerEvents: "none",
            zIndex: 30,
          }}
        >
          {recording ? (
            <Pause className="w-8 h-8 text-[#6B4EFF]" />
          ) : (
            <Mic className="w-8 h-8 text-[#6B4EFF]" />
          )}
        </div>
      </main>
    </div>
  );
}
