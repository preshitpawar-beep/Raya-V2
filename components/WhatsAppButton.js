"use client";
import Link from "next/link";

// TODO: add your WhatsApp number in international format, digits only, e.g. "447700900123".
// While this is empty, the button opens the quote page instead. Fill it in to enable WhatsApp.
const WHATSAPP_NUMBER = "";
const PREFILL = "Hi Legacy Imprint, I'd like a quote for some branded products.";

export default function WhatsAppButton() {
  const href = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL)}`
    : "/quote";
  const label = WHATSAPP_NUMBER ? "Chat on WhatsApp" : "Quick enquiry";
  return (
    <Link
      href={href}
      target={WHATSAPP_NUMBER ? "_blank" : undefined}
      rel={WHATSAPP_NUMBER ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-[#25D366] text-white pl-3 pr-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.2 1.4 3.5c.2.2 2.4 3.7 5.9 5.1 3.5 1.4 3.5.9 4.1.9.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/>
      </svg>
      <span className="text-sm font-semibold hidden sm:inline">{label}</span>
    </Link>
  );
}
