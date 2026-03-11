"use client";

import { useEffect, useState, useRef } from "react";
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

const swipeConfidenceThreshold = 50;

const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Auto play
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  return (
    <section className="relative w-full overflow-hidden">

      {/* ================= MOBILE HERO ================= */}
      <div className="md:hidden relative h-[60vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[index].image}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                setIndex((prev) => (prev + 1) % slides.length);
              } else if (swipe > swipeConfidenceThreshold) {
                setIndex((prev) =>
                  prev === 0 ? slides.length - 1 : prev - 1
                );
              }
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[index].image}
              alt={slides[index].title}
              fill
              priority
              className="object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* CONTENT */}
        <div className="relative z-10 h-full flex items-end">
          <div className="p-5 pb-16 w-full">
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
          </div>
        </div>

        {/* MOBILE DOTS */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setIndex(i);
              }}
              className={`w-2.5 h-2.5 rounded-full transition ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ================= DESKTOP HERO ================= */}
      <div className="hidden md:block relative">
        <div className="grid grid-cols-[3fr_2fr] min-h-[48vh]">

          {/* LEFT – TEXT */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F6F5F2] to-[#EEECE6]" />

            <div className="relative z-10 w-full max-w-2xl px-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <h1 className="text-5xl font-bold leading-tight text-dark mb-4">
                    {slides[index].title}
                  </h1>

                  <p className="text-lg text-gray-600 mb-6">
                    {slides[index].subtitle}
                  </p>

                  <div className="flex gap-4">
                    <Link
                      href="/products"
                      className="bg-dark text-white px-8 py-3 rounded-lg font-semibold"
                    >
                      View Products
                    </Link>
                    <Link
                      href="/quote"
                      className="border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-white"
                    >
                      Get a Quote
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT – IMAGE */}
          <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[index].image}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <div className="relative w-[80%] h-[80%]">
                  <Image
                    src={slides[index].image}
                    alt={slides[index].title}
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* DESKTOP DOTS */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setIndex(i);
              }}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-dark" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
