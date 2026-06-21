"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  sender: "bot" | "user";
  text: string;
  avatar: string;
};

export function ChatMessage({ sender, text, avatar }: Props) {
  const reduced = useReducedMotion();
  const isBot = sender === "bot";

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "flex items-end gap-2",
        isBot ? "justify-start" : "justify-end",
      )}
    >
      {isBot && (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-white">
          {avatar}
        </div>
      )}
      <div
        className={cn(
          "max-w-[82%] px-3.5 py-2 text-[13px] leading-relaxed",
          isBot
            ? "rounded-2xl rounded-bl-sm border border-fg/[0.08] bg-white text-fg"
            : "rounded-2xl rounded-br-sm bg-accent text-white",
        )}
      >
        {text}
      </div>
    </motion.div>
  );
}
