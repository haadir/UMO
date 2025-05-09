"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getMemoryById,
  updateMemory,
  Memory,
} from "../../memory-capture/MemoryGalleryUtils";

export default function MemoryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [memory, setMemory] = useState<Memory | null>(null);
  const [editing, setEditing] = useState(false);
  const [editedTranscript, setEditedTranscript] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (id) {
      const mem = getMemoryById(id);
      setMemory(mem || null);
      setEditedTranscript(mem?.transcript || "");
    }
  }, [id]);

  const handleSave = () => {
    if (!memory) return;
    updateMemory(memory.id, { transcript: editedTranscript });
    setMemory({ ...memory, transcript: editedTranscript });
    setEditing(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  if (!memory) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#18114B] via-[#3a3a6a] to-[#c3defa]">
        <main
          className="bg-[#C3DEFA] w-full max-w-[393px] max-h-[900px] min-h-[700px] rounded-[2.5rem] shadow-2xl flex flex-col px-4 pt-4 pb-0 mx-auto relative items-center justify-center"
          style={{ minHeight: 700 }}
        >
          <div className="text-center text-[#18114B] font-bold">
            Memory not found.
          </div>
        </main>
      </div>
    );
  }

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
            onClick={() => router.push("/memory-gallery")}
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
        {/* Image */}
        <div className="flex justify-center mb-4">
          <img
            src={memory.imageUrl}
            alt={memory.title}
            className="rounded-xl w-full max-w-xs shadow-lg"
            style={{ aspectRatio: "1/1" }}
          />
        </div>
        {/* Title */}
        <div
          className="text-lg font-bold text-center text-[#18114B] mb-2"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          {memory.title}
        </div>
        {/* Edit/Verify Buttons */}
        <div className="flex flex-row gap-2 justify-center mb-2">
          <button
            className="bg-[#B9AFFF] text-[#18114B] font-bold py-2 px-4 rounded-lg text-base"
            onClick={() => setEditing(false)}
            disabled={!editing}
          >
            Verify
          </button>
          <button
            className="bg-[#6B4EFF] text-white font-bold py-2 px-4 rounded-lg text-base"
            onClick={() => setEditing(true)}
            disabled={editing}
          >
            Edit Memory
          </button>
        </div>
        {/* Transcript */}
        <div className="w-full flex flex-col items-center">
          {editing ? (
            <textarea
              className="w-full max-w-xs rounded-lg border border-[#18114B] px-4 py-2 mb-4 text-lg text-[#18114B] font-bold bg-white focus:outline-none focus:ring-2 focus:ring-[#6B4EFF]"
              style={{ fontFamily: "var(--font-fredoka)" }}
              value={editedTranscript}
              onChange={(e) => setEditedTranscript(e.target.value)}
              rows={5}
            />
          ) : (
            <div
              className="w-full max-w-xs bg-white rounded-lg border border-[#18114B] px-4 py-3 mb-4 text-base text-[#18114B] font-normal"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              {memory.transcript}
            </div>
          )}
        </div>
        {/* Save Button */}
        {editing && (
          <button
            className="w-full max-w-xs bg-[#6B4EFF] text-white font-bold py-3 rounded-lg text-lg mb-2"
            onClick={handleSave}
          >
            Save
          </button>
        )}
        {success && (
          <div className="text-green-600 font-bold text-center mb-2">
            Memory updated!
          </div>
        )}
      </main>
    </div>
  );
}
