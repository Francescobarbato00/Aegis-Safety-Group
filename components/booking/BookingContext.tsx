"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Expert } from "@/lib/experts-data";

type BookingData = {
  expert: Expert | null;
  date: Date | null;
  time: string | null;
  fullName: string;
  email: string;
  phone: string;
  notes: string;
};

const emptyBooking: BookingData = {
  expert: null,
  date: null,
  time: null,
  fullName: "",
  email: "",
  phone: "",
  notes: "",
};

type BookingContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  step: number;
  setStep: (s: number) => void;
  data: BookingData;
  updateData: (partial: Partial<BookingData>) => void;
  reset: () => void;
};

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState<BookingData>(emptyBooking);

  const open = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };
  const updateData = (partial: Partial<BookingData>) =>
    setData((prev) => ({ ...prev, ...partial }));
  const reset = () => {
    setData(emptyBooking);
    setStep(1);
  };

  return (
    <BookingContext.Provider
      value={{ isOpen, open, close, step, setStep, data, updateData, reset }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
