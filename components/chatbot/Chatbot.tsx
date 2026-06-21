"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatPanel } from "./ChatPanel";
import { chatFlow, type ChatAction } from "@/lib/chatbot-flow";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentNodeId, setCurrentNodeId] = useState<string>("start");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const msgIdRef = useRef(0);
  const nextId = () => `m${msgIdRef.current++}`;

  // Nudge dopo 20s se non ha mai aperto
  useEffect(() => {
    if (hasInteracted) return;
    const timer = setTimeout(() => setShowNudge(true), 20000);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  // Riproduce i messaggi del bot con typing indicator
  const playBotMessages = useCallback((texts: string[]) => {
    setIsTyping(true);
    let delay = 0;
    texts.forEach((text, i) => {
      const typingTime = Math.min(text.length * 20, 1200); // ~20ms per char, max 1.2s
      delay += typingTime;
      setTimeout(() => {
        setMessages((prev) => [...prev, { id: nextId(), sender: "bot", text }]);
        if (i === texts.length - 1) setIsTyping(false);
      }, delay);
    });
  }, []);

  // Inizializza la conversazione all'apertura
  const initConversation = useCallback(() => {
    if (messages.length > 0) return; // già inizializzata
    playBotMessages(chatFlow.start.messages);
  }, [messages.length, playBotMessages]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowNudge(false);
    setHasInteracted(true);
    initConversation();
  };

  const handleClose = () => setIsOpen(false);

  const handleOptionClick = (label: string, action: ChatAction) => {
    // Aggiunge il messaggio dell'utente
    setMessages((prev) => [...prev, { id: nextId(), sender: "user", text: label }]);

    if (action.type === "restart") {
      setTimeout(() => {
        setCurrentNodeId("start");
        playBotMessages(chatFlow.start.messages);
      }, 400);
      return;
    }

    if (action.type === "goto") {
      const node = chatFlow[action.nodeId];
      setCurrentNodeId(action.nodeId);
      setTimeout(() => playBotMessages(node.messages), 400);
    }
    // type "link" gestito direttamente nel componente come <a>
  };

  return (
    <>
      <ChatBubble
        isOpen={isOpen}
        showNudge={showNudge}
        onOpen={handleOpen}
        onClose={handleClose}
        onDismissNudge={() => setShowNudge(false)}
      />
      <ChatPanel
        isOpen={isOpen}
        messages={messages}
        currentNode={chatFlow[currentNodeId]}
        isTyping={isTyping}
        onOptionClick={handleOptionClick}
        onClose={handleClose}
      />
    </>
  );
}
