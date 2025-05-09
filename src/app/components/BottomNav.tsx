"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BottomNav({
  active,
  onMicClick,
}: {
  active?: string;
  onMicClick?: () => void;
}) {
  const router = useRouter();
  return (
    <nav
      className="w-full flex justify-between items-center px-6 pt-2 pb-1 border-t border-[#18114B] bg-white rounded-b-[2.5rem]"
      style={{ position: "sticky", bottom: 0, left: 0, zIndex: 20 }}
    >
      <button
        className="flex flex-col items-center cursor-pointer"
        onClick={() => router.push("/home")}
      >
        <Image src="/icons/home.svg" alt="Home" width={32} height={32} />
      </button>
      <button className="flex flex-col items-center cursor-pointer">
        <Image src="/icons/capture.svg" alt="Capture" width={32} height={32} />
      </button>
      <button
        className="bg-[#E3D6FF] border-2 border-[#18114B] rounded-full shadow-lg flex items-center justify-center cursor-pointer"
        style={{ width: 64, height: 64 }}
        onClick={onMicClick}
      >
        <Image src="/icons/mic.svg" alt="Mic" width={32} height={32} />
      </button>
      <button className="flex flex-col items-center cursor-pointer">
        <Image
          src="/icons/memoquest.svg"
          alt="MemoQuest"
          width={32}
          height={32}
        />
      </button>
      <button className="flex flex-col items-center cursor-pointer">
        <Image src="/icons/gallery.svg" alt="Gallery" width={32} height={32} />
      </button>
    </nav>
  );
}
