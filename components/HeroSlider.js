"use client";

import { useEffect, useState } from "react";
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

  // Auto slide every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-[70vh] bg-[#F7F8FA] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            {/* Text */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dark">
                {slides[index].title}
              </h1>
              <p className="text-lg text-gray-700 mb-8 max-w-xl">
                {slides[index].subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="bg-white px-8 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition"
                >
                  View Products
                </Link>
                <Link
                  href="/quote"
                  className="bg-dark text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Get a Quote
                </Link>
              </div>
            </div>

            {/* Image */}
           <div className="flex justify-center">
             <div className="bg-[#F1F3F6] rounded-3xl p-6 md:p-8">
               <Image
                 src={slides[index].image}
                 alt={slides[index].title}
                 width={520}
                 height={420}
                 priority
               />
             </div>
           </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition ${
                i === index ? "bg-dark" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
