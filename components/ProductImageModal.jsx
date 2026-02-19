"use client";

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

/* ---------------- MODAL ---------------- */

export default function ProductImageModal({ product, onClose }) {
  if (!product) return null;

  const isMultiVariant = isMultiVariantProduct(product);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* MODAL CONTENT */}
      <div className="relative bg-white rounded-xl p-4 max-w-lg w-full mx-4 z-10">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-lg"
          aria-label="Close"
        >
          ✕
        </button>

        {/* IMAGE */}
        <img
          src={`/products/${product.id}.jpg`}
          alt={product.name}
          className="w-full object-contain max-h-[70vh]"
          onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
        />

        {/* DETAILS */}
        <div className="mt-4 text-center space-y-1">
          <p className="text-sm font-semibold">{product.name}</p>

          {isMultiVariant && (
            <p className="text-xs text-gray-600">
              Multiple variants available — please specify required part number /
              colour (shown left to right).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
