"use client";

import { motion } from "framer-motion";

export default function Slider() {
  return (
    <section className="py-16 bg-secondary">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Explore Our Product Categories
          </h2>
          <p className="text-lg mb-8">
            Branded merchandise designed for your business
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              "Pens & Stationery",
              "Notebooks & Notepads",
              "Bags & Accessories",
              "Corporate Gifting",
            ].map((item) => (
              <div
                key={item}
                className="bg-white p-6 rounded-lg shadow-sm font-semibold"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
