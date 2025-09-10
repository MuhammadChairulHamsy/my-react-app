import React, { useState } from "react";
import { ProductCard } from "./ProductCard";
import { products } from "@/data/data-products";

export const ProductList = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    console.log("Adding:", product); // cek kalau function terpanggil

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // kalau sudah ada → qty +1
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1, total: (item.qty + 1) * item.price }
            : item
        );
      } else {
        // kalau belum ada → tambahkan item baru
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            qty: 1,
            total: product.price,
          },
        ];
      }
    });
  };

  const handleDeleteFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <>
    <div className="w-full mx-5 my-20 md:w-[90%]">
      {/* Product List */}
      <div
        className="grid 
      gap-5 
      sm:grid-cols-2 
      md:grid-cols-2 
      lg:grid-cols-4"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      {/* Cart Table */}
      <div className="mx-20 md:mx-5">
        <h1 className="text-3xl font-bold text-amber-200 mb-3">Cart</h1>
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Qty</th>
              <th className="border border-gray-300 p-2">Total</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">${item.price}</td>
                <td className="border border-gray-300 p-2">{item.qty}</td>
                <td className="border border-gray-300 p-2">
                  ${item.total.toFixed(2)}
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleDeleteFromCart(item.id)}
                    className=" bg-red-500 text-slate-50 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
    </>
  );
};
