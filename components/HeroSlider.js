"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    title: "Custom Branded Promotional Products for UK Businesses",
    subtitle: "Pens, notebooks, bags & corporate giveaways — based in Tiverton, Devon",
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
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const timeoutRef = useRef(null);

  // Touch tracking
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const isDragging = useRef(false);

  const goTo = useCallback((nextIndex, dir) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDirection(dir);
    setIndex(nextIndex);
  }, []);

  const next = useCallback(() => {
    goTo((index + 1) % slides.length, 1);
  }, [index, goTo]);

  const prev = useCallback(() => {
    goTo(index === 0 ? slides.length - 1 : index - 1, -1);
  }, [index, goTo]);

  // Auto play
  useEffect(() => {
    timeoutRef.current = setTimeout(next, 5000);
    return () => clearTimeout(timeoutRef.current);
  }, [index, next]);

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = false;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;
    const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
    // Only prevent scroll if horizontal swipe is dominant
    if (dx > dy && dx > 8) {
      isDragging.current = true;
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);

    // Only trigger if horizontal swipe and not accidental
    if (isDragging.current && Math.abs(dx) > 40 && dy < 80) {
      if (dx < 0) next();
      else prev();
    }

    touchStartX.current = null;
    touchStartY.current = null;
    isDragging.current = false;
  };

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  const textVariants = {
    enter: (dir) => ({ opacity: 0, y: dir > 0 ? 16 : -16 }),
    center: { opacity: 1, y: 0 },
    exit: (dir) => ({ opacity: 0, y: dir > 0 ? -16 : 16 }),
  };

  return (
    <section className="relative w-full overflow-hidden">

      {/* ── MOBILE HERO ── */}
      <div
        className="md:hidden relative overflow-hidden"
        style={{ height: "60vh" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background image */}
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={`bg-${index}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <Image
              src={slides[index].image}
              alt={slides[index].title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Text content */}
        <div className="relative z-10 h-full flex items-end">
          <div className="p-5 pb-16 w-full">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={`text-${index}`}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <h1 className="text-3xl font-bold text-white mb-2 leading-tight">
                  {slides[index].title}
                </h1>
                <p className="text-sm text-white/90 mb-4">
                  {slides[index].subtitle}
                </p>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/products"
                    className="bg-white text-dark px-5 py-3 rounded-lg font-semibold text-center"
                  >
                    View Products
                  </Link>
                  <Link
                    href="/quote"
                    className="border border-white/60 text-white px-5 py-3 rounded-lg font-semibold text-center"
                  >
                    Get a Quote
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              style={{
                width: i === index ? "20px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: i === index ? "#fff" : "rgba(255,255,255,0.4)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Swipe hint — fades after first interaction */}
        <div className="absolute bottom-14 right-5 z-20 flex items-center gap-1 opacity-50">
          <span style={{ fontSize: "0.6rem", color: "white", letterSpacing: "0.1em", textTransform: "uppercase" }}>swipe</span>
        </div>
      </div>

      {/* ── DESKTOP HERO ── */}
      <div className="hidden md:block relative">
        <div className="grid grid-cols-[3fr_2fr] min-h-[48vh]">

          {/* LEFT — text */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F6F5F2] to-[#EEECE6]" />
            <div className="relative z-10 w-full max-w-2xl px-14">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={`desktop-text-${index}`}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <h1 className="text-5xl font-bold leading-tight text-dark mb-4">
                    {slides[index].title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    {slides[index].subtitle}
                  </p>
                  <div className="flex gap-4">
                    <Link href="/products" className="bg-dark text-white px-8 py-3 rounded-lg font-semibold">
                      View Products
                    </Link>
                    <Link href="/quote" className="border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-white">
                      Get a Quote
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT — image */}
          <div className="relative flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="sync">
              <motion.div
                key={`desktop-img-${index}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <div className="relative w-[80%] h-[80%]">
                  <Image
                    src={slides[index].image}
                    alt={slides[index].title}
                    fill
                    priority={index === 0}
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`rounded-full transition-all duration-300 ${
                i === index ? "bg-dark w-6 h-3" : "bg-gray-300 w-3 h-3"
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
