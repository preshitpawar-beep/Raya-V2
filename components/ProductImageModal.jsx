"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/* ---------------- HELPERS ---------------- */
const MULTI_VARIANT_RANGES = [
  { from: 119, to: 126 },
  { from: 127, to: 132 },
  { from: 133, to: 139 },
  { from: 140, to: 146 },
];

const isMultiVariantProduct = (product) => {
  if (!product?.id?.startsWith("MP")) return false;
  const number = parseInt(product.id.replace("MP", ""), 10);
  if (Number.isNaN(number)) return false;
  return MULTI_VARIANT_RANGES.some(
    (range) => number >= range.from && number <= range.to
  );
};

const TIER_LABELS = { "50": "50+", "100": "100+", "250": "250+", "500": "500+" };

/* ---------------- MODAL ---------------- */
export default function ProductImageModal({ product, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!product || !mounted) return null;

  const isMultiVariant = isMultiVariantProduct(product);
  const hasTiers = product.pricing && Object.keys(product.pricing).length > 0;

  return createPortal(
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={onClose}
    >
      <div
        className="modal-content"
        style={{
          position: "relative",
          backgroundColor: "#ffffff",
          borderRadius: "0.75rem",
          padding: "1.25rem",
          width: "100%",
          maxWidth: "500px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full object-contain max-h-[55vh]"
          onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
        />

        {/* Details */}
        <div className="mt-4 text-center space-y-2">
          <p className="text-sm font-semibold">{product.name}</p>

          {/* Tiered pricing table */}
          {hasTiers ? (
            <div className="mt-3">
              <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden text-xs">
                {Object.entries(product.pricing).map(([qty, price]) => (
                  <div key={qty} className="px-3 py-2 text-center border-r border-gray-200 last:border-r-0">
                    <div className="text-gray-400 font-medium">{TIER_LABELS[qty] || `${qty}+`}</div>
                    <div className="text-dark font-bold mt-0.5">£{price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-1.5">
                Per unit, excl. VAT · Branding included
              </p>
            </div>
          ) : (
            <p className="text-xs text-gray-400">
              From £{product.price.toFixed(2)} per unit (excl. VAT)
            </p>
          )}

          {product.moq && (
            <p className="text-[11px] text-gray-500">
              Minimum order: {product.moq} units
            </p>
          )}

          {isMultiVariant && (
            <p className="text-xs text-gray-600 mt-1">
              Multiple variants available — please specify required part number /
              colour (shown left to right).
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
