import { Phone } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/message/ELXYAE7PBGAWP1"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center animate-pulse hover:scale-110 transition-transform duration-300"
      style={{
        backgroundColor: "#25D366",
        boxShadow: "0 4px 16px rgba(37, 211, 102, 0.3)",
      }}
      aria-label="Contactar por WhatsApp"
    >
      <Phone className="w-6 h-6 text-white" fill="white" />
    </a>
  );
}
