"use client";

import { motion } from "framer-motion";

const items = [
  {
    icon: "🖼️",
    title: "Free visual proof before you order",
    text: "See how your logo will look on the product before production.",
  },
  {
    icon: "🎨",
    title: "Design & colour guidance",
    text: "We help you choose colours and finishes that suit your brand.",
  },
  {
    icon: "🤝",
    title: "Real people, real support",
    text: "Speak directly with someone who understands your requirements.",
  },
  {
    icon: "£",
    title: "Clear pricing",
    text: "Transparent pricing with print included where possible.",
  },
];

export default function Slider() {
  return (
    <section className="bg-[#F3F2EE] py-6 overflow-hidden">
      <div className="relative w-full">

        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear",
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {[...items, ...items].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 px-6"
            >
              <span className="text-2xl">{item.icon}</span>

              <div className="text-left">
                <p className="text-sm font-medium text-dark">
                  {item.title}
                </p>
                <p className="text-xs text-gray-600">
                  {item.text}
                </p>
              </div>

              <span className="mx-6 h-6 w-px bg-gray-300" />
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
