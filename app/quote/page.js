"use client";

import { useState } from "react";

export default function Quote() {
  const [submitted, setSubmitted] = useState(false);

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
            We usually respond within <strong>1 business day</strong> with a
            personalised quote.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F7F8FA]">
      <div className="max-w-xl mx-auto px-6 py-12 md:py-20">
        
        {/* Guided Intro */}
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
          onSubmit={(e) => {
            e.preventDefault();

            const form = e.target;
            const name = form[0].value;
            const email = form[1].value;
            const company = form[2].value;
            const message = form[3].value;

            const mailtoLink = `mailto:preshit555@gmail.com?subject=Quote Request from ${name}&body=
            Name: ${name}%0D%0A
            Email: ${email}%0D%0A
            Company: ${company}%0D%0A%0D%0A
            Message:%0D%0A${message}`;

            window.location.href = mailtoLink;

            setSubmitted(true);
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
              className="w-full p-3 border rounded-lg min-h-[120px]"
              placeholder="Tell us about products, quantities, or deadlines"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-dark text-white py-3.5 rounded-xl font-semibold text-base hover:opacity-90"
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
