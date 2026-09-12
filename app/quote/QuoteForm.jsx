"use client";

import { useState, useEffect } from "react";

const MAX_MB = 4;

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [logo, setLogo] = useState(null); // { name, type, base64 }
  const [fileError, setFileError] = useState("");

  /* Pre-fill product + quantity from a product page (one time) */
  useEffect(() => {
    const savedItem = localStorage.getItem("quoteItem");
    if (savedItem) {
      try {
        const { product, quantity } = JSON.parse(savedItem);
        setMessage(`Product: ${product}\nQuantity: ${quantity}\n\nAdditional requirements:`);
      } catch (e) {}
      localStorage.removeItem("quoteItem");
    }
  }, []);

  const clearForm = () => {
    setMessage("");
    setLogo(null);
    setFileError("");
  };

  const onFile = (e) => {
    setFileError("");
    const file = e.target.files?.[0];
    if (!file) {
      setLogo(null);
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setFileError(`That file is over ${MAX_MB}MB. Please upload a smaller logo, or leave it and we'll ask for it after.`);
      setLogo(null);
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      setLogo({ name: file.name, type: file.type || "application/octet-stream", base64 });
    };
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          logoName: logo?.name || null,
          logoType: logo?.type || null,
          logoBase64: logo?.base64 || null,
        }),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to send enquiry. Please try again.");
      }
    } catch (err) {
      alert("Failed to send enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="bg-[#F7F8FA] min-h-[70vh] flex items-center justify-center px-6">
        <div className="max-w-md bg-white rounded-2xl p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold mb-4">Thanks — your quote request has been sent</h1>
          <p className="text-gray-700 mb-4">
            We've received your details and one of our team will review your request.
          </p>
          <p className="text-gray-700">
            We usually reply the <strong>same working day</strong>, often within a few hours
            {logo ? ", with a proof showing your logo" : ""}.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F7F8FA]">
      <div className="max-w-xl mx-auto px-6 py-12 md:py-20">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Get a Quote</h1>
          <p className="text-gray-700">
            Tell us what you're looking for and we'll get back to you with a personalised quote.
            Add your logo and we'll send a free digital proof with your price.
          </p>
        </div>

        <form className="space-y-5 bg-white rounded-2xl p-6 md:p-8 shadow-sm" onSubmit={submit}>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              className="w-full p-3 border rounded-lg"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <input
              className="w-full p-3 border rounded-lg"
              placeholder="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              className="w-full p-3 border rounded-lg min-h-[140px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Logo upload (optional) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload your logo <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="file"
              accept="image/*,.pdf,.svg,.ai,.eps"
              onChange={onFile}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-dark hover:file:bg-gray-200 cursor-pointer"
            />
            <p className="text-xs text-gray-400 mt-1.5">
              PNG, JPG, PDF, SVG, AI or EPS, up to {MAX_MB}MB. Add it and we'll send a proof with your quote.
            </p>
            {logo && (
              <p className="text-xs text-emerald-600 mt-1 font-medium">Attached: {logo.name}</p>
            )}
            {fileError && <p className="text-xs text-red-500 mt-1">{fileError}</p>}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-dark text-white py-3.5 rounded-xl font-semibold hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send Quote Request"}
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="flex-1 border border-gray-300 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-100"
            >
              Clear Form
            </button>
          </div>
        </form>

        <div className="mt-8 text-sm text-gray-600">
          <p className="font-medium mb-2">What happens next?</p>
          <ul className="list-disc list-inside space-y-1">
            <li>We review your requirements</li>
            <li>We prepare a personalised quote and a free digital proof</li>
            <li>We contact you the same working day, usually within a few hours</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
