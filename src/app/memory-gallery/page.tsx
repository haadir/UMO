"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getMemories,
  deleteMemory,
  Memory,
} from "../memory-capture/MemoryGalleryUtils";

export default function MemoryGalleryPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const router = useRouter();

  useEffect(() => {
    setMemories(getMemories());
  }, []);

  const handleDelete = (id: string) => {
    deleteMemory(id);
    setMemories(getMemories());
  };

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
            Memory Gallery
          </div>
          <div className="w-10" />
        </div>
        {/* Search bar (not functional, placeholder) */}
        <input
          className="w-full max-w-xs mx-auto rounded-lg border border-[#18114B] px-4 py-2 mb-4 text-lg text-[#18114B] font-bold bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4EFF]"
          style={{ fontFamily: "var(--font-fredoka)" }}
          placeholder="Search details of a memory"
          disabled
        />
        {/* Memories List */}
        <div className="flex flex-col gap-4 w-full flex-1 overflow-y-auto pb-4">
          {memories.length === 0 && (
            <div className="text-center text-[#18114B] font-bold mt-8">
              No memories saved yet.
            </div>
          )}
          {memories.map((memory) => (
            <div
              key={memory.id}
              className="relative flex flex-row items-center bg-white rounded-2xl border border-[#18114B] shadow-md mx-2 cursor-pointer"
              onClick={() => router.push(`/memory-gallery/${memory.id}`)}
            >
              <img
                src={memory.imageUrl}
                alt={memory.title}
                className="w-20 h-20 object-cover rounded-l-2xl"
              />
              <div className="flex-1 px-3 py-2">
                <div
                  className="font-bold text-[#18114B] text-base"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {memory.title}
                </div>
                <div className="text-xs text-[#6B4EFF]">
                  {new Date(memory.date).toLocaleDateString()}
                </div>
              </div>
              <button
                className="p-2 text-red-500 font-bold"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(memory.id);
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
