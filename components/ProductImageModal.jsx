"use client";

export default function ProductImageModal({ product, onClose }) {
  if (!product) return null;

  const isMultiVariant = product.id.includes("-");

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
      {/* BACKDROP CLICK CLOSE */}
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
              Multiple variants available — please specify required part number
              / colour (shown left to right).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
