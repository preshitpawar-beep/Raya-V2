"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ---------------- DATA ---------------- */

const slides = [
  {
    title: "Custom Branded Promotional Products",
    subtitle:
      "Pens, notebooks, bags & corporate giveaways for UK businesses",
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

const SLIDE_DURATION = 5500;

/* ---------------- MOTION PRESETS (MATCH SITE) ---------------- */

const textVariants = {
  enter: { opacity: 0, y: 20 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const imageVariants = {
  enter: { opacity: 0, x: 32 },
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -32,
    transition: { duration: 0.45, ease: "easeIn" },
  },
};

/* ---------------- COMPONENT ---------------- */

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const progressRef = useRef(null);

  const resetTimer = () => {
    clearTimeout(timeoutRef.current);

    // restart progress bar
    if (progressRef.current) {
      progressRef.current.style.width = "0%";
      progressRef.current.style.transition = "none";
      requestAnimationFrame(() => {
        progressRef.current.style.transition = `width ${SLIDE_DURATION}ms linear`;
        progressRef.current.style.width = "100%";
      });
    }

    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
  };

  useEffect(() => {
    resetTimer();
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <section className="py-16 md:py-24 bg-[#F7F8FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* ---------- TEXT ---------- */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-dark leading-tight">
                {slides[index].title}
              </h1>

              <p className="text-base md:text-lg text-gray-700 mb-8 max-w-xl">
                {slides[index].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="bg-white text-center px-8 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition"
                >
                  View Products
                </Link>

                <Link
                  href="/quote"
                  className="bg-dark text-center text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ---------- IMAGE (SWIPE ENABLED) ---------- */}
          <div className="flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[index].image}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) {
                    setIndex((prev) => (prev + 1) % slides.length);
                  } else if (info.offset.x > 80) {
                    setIndex((prev) =>
                      prev === 0 ? slides.length - 1 : prev - 1
                    );
                  }
                }}
                className="bg-[#F1F3F6] rounded-3xl p-6 md:p-8 cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={slides[index].image}
                  alt={slides[index].title}
                  width={420}
                  height={320}
                  priority
                  className="w-full h-auto select-none pointer-events-none"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ---------- PROGRESS BAR ---------- */}
        <div className="mt-10 h-[2px] bg-gray-300 overflow-hidden rounded">
          <div
            ref={progressRef}
            className="h-full bg-dark w-0"
          />
        </div>

      </div>
    </section>
  );
}
