"use client";

import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  isOpen: boolean;
  showNudge: boolean;
  onOpen: () => void;
  onClose: () => void;
  onDismissNudge: () => void;
};

export function ChatBubble({
  isOpen,
  showNudge,
  onOpen,
  onClose,
  onDismissNudge,
}: Props) {
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 z-[60] lg:bottom-8 lg:right-8",
        // Su mobile il pannello è fullscreen: nascondi la bubble quando è aperto
        isOpen && "max-sm:hidden",
      )}
    >
      {/* Nudge bubble */}
      <AnimatePresence>
        {showNudge && !isOpen && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-16 right-0 mb-2 w-64"
          >
            <div className="relative rounded-2xl rounded-br-sm border border-fg/[0.08] bg-white p-4 shadow-[0_12px_40px_-12px_rgba(15,27,45,0.25)]">
              <button
                onClick={onDismissNudge}
                className="absolute right-2 top-2 rounded-md p-1 transition-colors hover:bg-fg/[0.05]"
                aria-label="Chiudi"
              >
                <X className="h-3 w-3 text-fg-muted" />
              </button>
              <p className="pr-4 text-sm text-fg">
                Ciao! 👋 Hai domande sulla sicurezza della tua azienda?
              </p>
              <button
                onClick={onOpen}
                className="mt-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
              >
                Scrivici →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <button
        onClick={isOpen ? onClose : onOpen}
        aria-label={isOpen ? "Chiudi chat" : "Apri chat"}
        className={cn(
          "relative h-14 w-14 rounded-full shadow-[0_12px_32px_-8px_rgba(30,143,69,0.5)] lg:h-16 lg:w-16",
          "bg-accent transition-all duration-300 hover:bg-accent-hover",
          "group flex items-center justify-center",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/30",
        )}
      >
        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-20 motion-reduce:hidden" />
        )}

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={reduced ? false : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduced ? undefined : { rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={reduced ? false : { rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduced ? undefined : { rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
