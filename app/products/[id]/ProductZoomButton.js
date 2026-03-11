"use client";

import { useState } from "react";
import ProductImageModal from "../../../components/ProductImageModal";

export default function ProductZoomButton({ product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Zoom product image"
        className="absolute top-4 right-4 z-10 bg-white border border-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
      >
        ⤢
      </button>

      {open && (
        <ProductImageModal product={product} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
