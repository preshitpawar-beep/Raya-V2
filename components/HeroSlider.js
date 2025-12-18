"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    title: "Custom Branded Promotional Products",
    subtitle:
      "Pens, notebooks, bags & corporate giveaways for UK businesses",
    image: "/hero/hero-slide-products.png",
  },
  {
    title: "Corporate Gifts That Represent Your Brand",
    subtitle:
      "Thoughtfully designed merchandise for teams & clients",
    image: "/hero/hero-slide-gifting.png",
  },
  {
    title: "Eco-Friendly Branded Merchandise",
    subtitle:
      "Sustainable products made with quality materials",
    image: "/hero/hero-slide-eco.png",
  },
  {
    title: "Based in the South West, Delivering Across the UK",
    subtitle:
      "Proudly serving Tiverton and businesses nationwide",
    image: "/hero/hero-slide-uk.png",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Auto slide (smooth + reset on change)
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <section className="min-h-[70vh] bg-[#F7F8FA] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            {/* TEXT */}
            <div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-dark">
                {slides[index].title}
              </h1>

              <p className="text-lg text-gray-700 mb-8 max-w-xl">
                {slides[index].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="bg-white w-full sm:w-auto text-center px-8 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition"
                >
                  View Products
                </Link>

                <Link
                  href="/quote"
                  className="bg-dark w-full sm:w-auto text-center text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Get a Quote
                </Link>
              </div>
            </div>

            {/* IMAGE */}
            <div className="flex justify-center">
              <div className="bg-[#F1F3F6] rounded-3xl p-6 md:p-8">
                <Image
                  src={slides[index].image}
                  alt={slides[index].title}
                  width={420}
                  height={320}
                  priority
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* DOT NAVIGATION */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                clearTimeout(timeoutRef.current);
                setIndex(i);
              }}
              className={`w-2.5 h-2.5 rounded-full transition ${
                i === index ? "bg-dark" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
