"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ChatMessage } from "./ChatMessage";
import {
  chatbotPersona,
  type ChatNode,
  type ChatAction,
} from "@/lib/chatbot-flow";
import { companyInfo } from "@/lib/data";

type Message = { id: string; sender: "bot" | "user"; text: string };

type Props = {
  isOpen: boolean;
  messages: Message[];
  currentNode: ChatNode;
  isTyping: boolean;
  onOptionClick: (label: string, action: ChatAction) => void;
  onClose: () => void;
};

export function ChatPanel({
  isOpen,
  messages,
  currentNode,
  isTyping,
  onOptionClick,
  onClose,
}: Props) {
  const reduced = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const telHref = `tel:${companyInfo.phone.replace(/\s/g, "")}`;

  // Auto-scroll all'ultimo messaggio
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          className={cn(
            "fixed z-[59] flex flex-col overflow-hidden bg-bg",
            // Mobile: fullscreen
            "inset-0 h-full w-full rounded-none border-0",
            // Desktop (sm+): widget flottante
            "sm:inset-auto sm:bottom-28 sm:right-8 sm:h-[520px] sm:max-h-[calc(100vh-10rem)] sm:w-[370px] sm:rounded-2xl sm:border sm:border-fg/[0.1] sm:shadow-[0_24px_70px_-15px_rgba(15,27,45,0.35)]",
          )}
        >
          {/* Header */}
          <div className="flex shrink-0 items-center gap-2.5 bg-bg-dark px-4 py-3">
            {/* Avatar */}
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-[family-name:var(--font-sora)] text-base font-medium text-white">
                {chatbotPersona.initial}
              </div>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-bg-dark bg-emerald-500" />
            </div>
            <div className="flex-1">
              <p className="font-[family-name:var(--font-sora)] text-sm font-medium text-fg-dark">
                {chatbotPersona.name}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-fg-dark-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {chatbotPersona.role} · Online
              </p>
            </div>
            {/* Tasto chiudi — importante su mobile fullscreen */}
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/[0.1]"
              aria-label="Chiudi chat"
            >
              <X className="h-5 w-5 text-fg-dark-muted" />
            </button>
          </div>

          {/* Messages area */}
          <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto px-3.5 py-4">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                sender={msg.sender}
                text={msg.text}
                avatar={chatbotPersona.initial}
              />
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-white">
                  {chatbotPersona.initial}
                </div>
                <div className="rounded-2xl rounded-bl-sm border border-fg/[0.08] bg-white px-3.5 py-2.5">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg-muted/40 [animation-delay:0ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg-muted/40 [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg-muted/40 [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Options / CTA area */}
          {!isTyping && (
            <div className="shrink-0 space-y-2 border-t border-fg/[0.08] bg-white/50 p-3">
              {/* CTA contatto (se il nodo lo richiede) */}
              {currentNode.showContactCta && (
                <div className="mb-2.5 flex gap-2">
                  <Button
                    variant="primary"
                    size="md"
                    href="#contatti"
                    className="flex-1 text-[13px]"
                  >
                    Prenota check-up
                  </Button>
                  <a
                    href={telHref}
                    className="flex w-10 shrink-0 items-center justify-center rounded-lg border border-fg/[0.15] transition-colors hover:border-accent hover:bg-accent/[0.05]"
                    aria-label="Chiama"
                  >
                    <Phone className="h-4 w-4 text-accent" />
                  </a>
                </div>
              )}

              {/* Quick reply options */}
              <div className="flex flex-col gap-1.5">
                {currentNode.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => onOptionClick(opt.label, opt.action)}
                    className={cn(
                      "rounded-lg border px-3.5 py-2 text-left text-[13px] transition-all",
                      "border-accent/30 bg-accent/[0.04] text-accent",
                      "hover:border-accent/50 hover:bg-accent/[0.08]",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
