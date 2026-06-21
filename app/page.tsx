import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustBand } from "@/components/sections/TrustBand";
import { Problema } from "@/components/sections/Problema";
import { Processo } from "@/components/sections/Processo";
import { Servizi } from "@/components/sections/Servizi";
import { Faq } from "@/components/sections/Faq";
import { Contatti } from "@/components/sections/Contatti";
import { Footer } from "@/components/sections/Footer";
import { Chatbot } from "@/components/chatbot/Chatbot";
import { BookingProvider } from "@/components/booking/BookingContext";
import { BookingDrawer } from "@/components/booking/BookingDrawer";

export default function Home() {
  return (
    <BookingProvider>
      <Header />
      <main>
        <Hero />
        <TrustBand />
        <Problema />
        <Processo />
        <Servizi />
        <Faq />
        <Contatti />
      </main>
      <Footer />
      <Chatbot />
      <BookingDrawer />
    </BookingProvider>
  );
}
