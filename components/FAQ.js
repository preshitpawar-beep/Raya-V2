"use client";
import { useState } from "react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "How does ordering work?",
    a: "Send us an enquiry with the product and quantity. We reply the same working day, usually within a few hours, with a clear price and a free digital proof showing your logo. Approve the proof and we raise your order.",
  },
  {
    q: "How long does delivery take?",
    a: "Most items are made to order, with a typical turnaround of around 8 to 10 days after you approve your proof. If you have a deadline, tell us and we'll do our best to work to it.",
  },
  {
    q: "What are your minimum order quantities?",
    a: "Minimums are low and depend on the product, often from as few as 10 to 100 units. The minimum is shown on each product page.",
  },
  {
    q: "What logo formats do you accept?",
    a: "PNG, JPG, PDF, SVG, AI or EPS all work well. A vector file (PDF, SVG, AI or EPS) gives the sharpest result, but if you only have a logo from your website, send it over and we'll advise.",
  },
  {
    q: "Are there any setup or artwork fees?",
    a: "No. One branding method and a free digital proof are included in the price. No hidden setup fees.",
  },
  {
    q: "Do you offer a discount for new customers?",
    a: "Yes. New customers get 10% off their first order. Just mention WELCOME10 when you enquire.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-[#F7F8FA] py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-8 text-center">
            Frequently asked questions
          </h2>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-dark">{f.q}</span>
                <span className={`text-xl text-gray-400 transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <div className={`grid transition-all duration-300 ease-out ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-gray-700 leading-relaxed">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
