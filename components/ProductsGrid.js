"use client";
import { useState } from "react";
import { products } from "./productsData";

export default function ProductsGrid() {
  const categories = ["All","Pen","Notebook","Key Ring","Combo Sets","Bags"];
  const [active,setActive]=useState("All");

  const filtered = active === "All" ? products : products.filter(p=>p.category===active);

  return (
    <div>
      <div className="mb-6">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat=>(
            <button key={cat} onClick={()=>setActive(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition ${active===cat?"bg-dark text-white border-dark":"bg-white text-gray-700 border-gray-200"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {filtered.map(p=>(<ProductCard key={p.id} product={p}/>))}
      </div>
    </div>
  );
}

function ProductCard({product}) {
  const [qty,setQty]=useState(50);
  const increase=()=>setQty(q=>q+10);
  const decrease=()=>setQty(q=>q>50?q-10:q);

  return (
    <div className="rounded-xl p-4 md:p-6 bg-white shadow-sm border border-gray-100">
      <img src={product.image} alt={product.name} className="h-32 md:h-40 w-full object-contain bg-gray-100 rounded-lg mb-3"/>
      <h3 className="text-sm md:text-base font-semibold mb-1 leading-snug">{product.name}</h3>
      <p className="text-xs text-gray-600 mb-1">From £{product.price.toFixed(2)} per unit</p>
      <p className="text-[10px] text-gray-400 mb-3">Products are subject to availability</p>

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-600">Qty</span>
        <div className="flex items-center border rounded-lg overflow-hidden">
          <button onClick={decrease} className="px-3 py-1 text-sm">–</button>
          <span className="px-3 text-sm font-medium">{qty}</span>
          <button onClick={increase} className="px-3 py-1 text-sm">+</button>
        </div>
      </div>

      <button onClick={()=>{
        localStorage.setItem("quoteItem",JSON.stringify({id:product.id,product:product.name,quantity:qty,price:product.price}));
        window.location.href="/quote";
      }} className="w-full bg-dark text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90">
        Get quote
      </button>
    </div>
  );
}
