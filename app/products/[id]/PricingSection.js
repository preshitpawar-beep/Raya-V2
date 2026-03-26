"use client";

import { useState } from "react";

const TIER_ORDER = ["50", "100", "250", "500"];
const TIER_LABELS = { "50": "50+", "100": "100+", "250": "250+", "500": "500+" };

function tierForQty(qty) {
  if (qty >= 500) return "500";
  if (qty >= 250) return "250";
  if (qty >= 100) return "100";
  return "50";
}

export default function PricingSection({ product, moq }) {
  const hasTiers = product.pricing && Object.keys(product.pricing).length > 0;
  const [selectedTier, setSelectedTier] = useState(null);
  const [customQty, setCustomQty] = useState("");

  const defaultTier = hasTiers
    ? TIER_ORDER.find((t) => Number(t) >= moq) || "100"
    : null;
  const activeTier = selectedTier || defaultTier;

  const activePrice = hasTiers
    ? product.pricing[activeTier] || product.price
    : product.price;

  /* Compute display values */
  const hasCustom = customQty && Number(customQty) >= moq;
  const displayQty = hasCustom ? Number(customQty) : Number(activeTier) || moq;
  const displayPrice =
    hasCustom && hasTiers
      ? product.pricing[tierForQty(Number(customQty))] || product.price
      : activePrice;
  const lineTotal = displayPrice * displayQty;
  const qtyTooLow = customQty && Number(customQty) > 0 && Number(customQty) < moq;

  const handleQuote = () => {
    localStorage.setItem(
      "quoteItem",
      JSON.stringify({
        id: product.id,
        product: product.name,
        quantity: displayQty >= moq ? displayQty : moq,
        price: displayPrice,
        pricing: product.pricing || null,
        category: product.category,
      })
    );
    window.location.href = `/quote?product=${encodeURIComponent(product.name)}&qty=${displayQty >= moq ? displayQty : moq}`;
  };

  /* ── No tiers fallback ── */
  if (!hasTiers) {
    return (
      <div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl font-bold text-dark">
            From £{product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-400">per unit (excl. VAT)</span>
        </div>
        <p className="text-xs text-gray-400 mb-6">
          Price includes one standard branding method. No setup fees.
        </p>

        <button
          onClick={handleQuote}
          className="w-full sm:w-auto bg-dark text-white text-center px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition active:scale-95"
        >
          Get a Quote
        </button>
      </div>
    );
  }

  /* ── Full tiered pricing ── */
  return (
    <div>
      {/* Header price */}
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-2xl font-bold text-dark">
          From £{(product.pricing["500"] || product.price).toFixed(2)}
        </span>
        <span className="text-sm text-gray-400">per unit (excl. VAT)</span>
      </div>
      <p className="text-xs text-gray-400 mb-5">
        Price includes one standard branding method. No setup fees.
      </p>

      {/* ── Tier cards ── */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          Volume pricing
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {TIER_ORDER.map((tier) => {
            const price = product.pricing[tier];
            if (price == null) return null;
            const isActive = activeTier === tier && !customQty;
            const isBest = tier === "500";
            return (
              <button
                key={tier}
                onClick={() => {
                  setSelectedTier(tier);
                  setCustomQty("");
                }}
                className={`relative rounded-xl border-2 px-2 py-3.5 text-center transition ${
                  isActive
                    ? "border-dark bg-dark/[0.03]"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                {isBest && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                    Best value
                  </span>
                )}
                <p className="text-[11px] text-gray-400 font-medium">
                  {TIER_LABELS[tier]}
                </p>
                <p className="text-base md:text-lg font-bold text-dark mt-0.5">
                  £{price.toFixed(2)}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Custom quantity ── */}
      <div className="mt-4">
        <label className="text-xs text-gray-400 font-medium">
          Or enter your exact quantity
        </label>
        <div className="flex items-center gap-3 mt-1.5">
          <input
            type="number"
            placeholder={`Min ${moq} units`}
            min={moq}
            value={customQty}
            onChange={(e) => {
              setCustomQty(e.target.value);
              setSelectedTier(null);
            }}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-dark/20 focus:border-dark transition"
          />
          {hasCustom && (
            <div className="text-right shrink-0">
              <p className="text-lg font-bold text-dark">
                £{displayPrice.toFixed(2)}
                <span className="text-xs font-normal text-gray-400">/unit</span>
              </p>
            </div>
          )}
        </div>
        {qtyTooLow && (
          <p className="text-xs text-red-500 mt-1.5">
            Minimum order is {moq} units for this product
          </p>
        )}
      </div>

      {/* ── Order summary ── */}
      {displayQty >= moq && (
        <div className="bg-gray-50 rounded-xl px-5 py-4 mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {displayQty} units × £{displayPrice.toFixed(2)}
          </p>
          <div className="text-right">
            <p className="text-lg font-bold text-dark">
              £{lineTotal.toFixed(2)}
            </p>
            <p className="text-[11px] text-gray-400">excl. VAT</p>
          </div>
        </div>
      )}

      {/* ── CTA ── */}
      <button
        onClick={handleQuote}
        className="w-full bg-dark text-white py-4 rounded-xl text-base font-semibold hover:opacity-90 active:scale-[0.98] transition mt-5"
      >
        Get a quote for {displayQty >= moq ? displayQty : moq} units
      </button>
      <p className="text-center text-[11px] text-gray-400 mt-2.5">
        No obligation · Typically respond within 1 working day
      </p>
    </div>
  );
}
