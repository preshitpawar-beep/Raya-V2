"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    title: "Custom Branded Promotional Products",
    subtitle: "Pens, notebooks, bags & corporate giveaways for UK businesses",
    image: "/hero/hero-slide-products.png",
  },
  {
    title: "Based in the South West, Delivering Across the UK",
    subtitle: "Proudly serving Tiverton and businesses nationwide",
    image: "/hero/hero-slide-uk.png",
  },
  {
    title: "Corporate Gifts That Represent Your Brand",
    subtitle: "Thoughtfully designed merchandise for teams & clients",
    image: "/hero/hero-slide-gifting.png",
  },
  {
    title: "Eco-Friendly Branded Merchandise",
    subtitle: "Sustainable products made with quality materials",
    image: "/hero/hero-slide-eco.png",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <section className="relative w-full h-[85vh] min-h-[520px] overflow-hidden bg-white">
      
      {/* BACKGROUND IMAGE */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[index].image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slides[index].image}
            alt={slides[index].title}
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* DARK OVERLAY (keeps text readable) */}
      <div className="absolute inset-0 bg-black/45" />

      {/* EDGE FADE INTO WHITE (premium blending) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white mb-6">
              {slides[index].title}
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-10">
              {slides[index].subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-white text-dark px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition text-center"
              >
                View Products
              </Link>

              <Link
                href="/quote"
                className="border border-white/60 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition text-center"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              clearTimeout(timeoutRef.current);
              setIndex(i);
            }}
            className={`w-3 h-3 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
