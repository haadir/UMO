"use client";
import Image from "next/image";
import {
  Settings,
  Home,
  Image as ImageIcon,
  Mic,
  Puzzle,
  Cog,
} from "lucide-react";
import { useRouter } from "next/navigation";
import BottomNav from "../components/BottomNav";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      type: "spring",
      stiffness: 60,
    },
  }),
};

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#18114B] via-[#3a3a6a] to-[#c3defa]">
      <motion.main
        className="bg-[#C3DEFA] w-full max-w-[393px] max-h-[900px] min-h-[700px] rounded-[2.5rem] shadow-2xl flex flex-col px-4 pt-4 pb-0 mx-auto relative"
        style={{ minHeight: 700 }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
      >
        {/* Top bar: settings icon at top right */}
        <motion.div
          className="flex w-full justify-end items-start mb-2"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <button className="p-2 rounded-full border-2 border-[#18114B] bg-white mt-2 mr-1">
            <Settings className="w-6 h-6 text-[#18114B]" />
          </button>
        </motion.div>
        {/* Centered, larger Logo */}
        <motion.div
          className="flex flex-col items-center w-full mb-4 mt-2"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <Image src="/umo-logo.svg" alt="UMO logo" width={140} height={140} />
        </motion.div>
        {/* Welcome and guided tour */}
        <motion.div
          className="flex flex-col items-center w-full mb-2"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <div
            className="text-lg font-bold text-center text-[#18114B]"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Welcome, Gerald
          </div>
          <button
            className="w-full bg-white border border-[#18114B] rounded-lg py-2 px-4 text-lg font-bold text-[#18114B] mt-2 mb-2"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Start guided tour!
          </button>
        </motion.div>
        {/* Feature Buttons */}
        <div className="flex flex-col gap-3 w-full flex-1 justify-center mb-2">
          {[
            {
              src: "/memorycapture.png",
              onClick: () => router.push("/memory-capture"),
            },
            {
              src: "/memoquest.png",
              onClick: () => router.push("/memoquest"),
            },
            {
              src: "/memorygallery.png",
              onClick: () => router.push("/memory-gallery"),
            },
          ].map((btn, i) => (
            <motion.button
              key={btn.src}
              className="rounded-2xl overflow-hidden border border-[#18114B] shadow-md w-full h-20 flex items-center justify-center relative p-0 cursor-pointer"
              onClick={btn.onClick}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={3 + i}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Image
                src={btn.src}
                alt={btn.src}
                fill
                className="object-cover"
                priority
              />
            </motion.button>
          ))}
        </div>
        {/* Bottom Navigation */}
        <BottomNav />
      </motion.main>
    </div>
  );
}
