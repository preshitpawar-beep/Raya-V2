"use client";

import { useState, useEffect } from "react";

export default function Quote() {
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  /* ----------------------------------------
     Load selected product + quantity
  ---------------------------------------- */
  useEffect(() => {
    const savedItem = localStorage.getItem("quoteItem");

    if (savedItem) {
      const { product, quantity } = JSON.parse(savedItem);
      setMessage(
        `Product: ${product}\nQuantity: ${quantity}\n\nAdditional requirements:`
      );
    }
  }, []);

  /* ----------------------------------------
     Success states
  ---------------------------------------- */
  if (submitted) {
    return (
      <main className="bg-[#F7F8FA] min-h-[70vh] flex items-center justify-center px-6">
        <div className="max-w-md bg-white rounded-2xl p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold mb-4">
            Thanks — your quote request has been sent
          </h1>
          <p className="text-gray-700 mb-4">
            We’ve received your details and one of our team members will review
            your request.
          </p>
          <p className="text-gray-700">
            We usually respond within <strong>1 business day</strong>.
          </p>
        </div>
      </main>
    );
  }

  /* ----------------------------------------
     Quote form
  ---------------------------------------- */
  return (
    <main className="bg-[#F7F8FA]">
      <div className="max-w-xl mx-auto px-6 py-12 md:py-20">

        {/* Intro */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            Get a Quote
          </h1>
          <p className="text-gray-700">
            Tell us what you’re looking for and we’ll get back to you with a
            personalised quote.
          </p>
        </div>

        {/* Form */}
        <form
          className="space-y-5 bg-white rounded-2xl p-6 md:p-8 shadow-sm"
          onSubmit={async (e) => {
            e.preventDefault();

            const form = e.target;

            const response = await fetch("/api/send-quote", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: form[0].value,
                email: form[1].value,
                company: form[2].value,
                message: message,
              }),
            });

            if (response.ok) {
              setSubmitted(true);
            } else {
              alert("Failed to send enquiry. Please try again.");
            }
          }}
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              className="w-full p-3 border rounded-lg"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg"
              placeholder="you@company.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Company
            </label>
            <input
              className="w-full p-3 border rounded-lg"
              placeholder="Company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              className="w-full p-3 border rounded-lg min-h-[140px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-dark text-white py-3.5 rounded-xl font-semibold hover:opacity-90"
          >
            Send Quote Request
          </button>
        </form>

        {/* What Happens Next */}
        <div className="mt-8 text-sm text-gray-600">
          <p className="font-medium mb-2">What happens next?</p>
          <ul className="list-disc list-inside space-y-1">
            <li>We review your requirements</li>
            <li>We prepare a personalised quote</li>
            <li>We contact you within 1 business day</li>
          </ul>
        </div>

      </div>
    </main>
  );
}
