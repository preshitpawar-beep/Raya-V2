"use client";
import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!email.trim() || busy) return;
    setBusy(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (e) {}
    setBusy(false);
    setDone(true);
  };

  return (
    <section className="bg-primary/40 py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-dark mb-3">
          Free promotional product ideas guide
        </h2>
        <p className="text-gray-700 mb-6">
          Not sure where to start? Pop in your email and we'll send over ideas and best-sellers to
          brand for your business. No spam, unsubscribe any time.
        </p>
        {done ? (
          <p className="font-semibold text-dark">Thanks — check your inbox shortly.</p>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="you@company.com"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-dark/20 outline-none"
            />
            <button
              onClick={submit}
              disabled={busy}
              className="bg-dark text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-60 transition"
            >
              {busy ? "Sending..." : "Send it to me"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
