import React, { useEffect, useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import { getProducts } from "@/services/product.service";

export const ProductList = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      const sum = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);

  // useRef
  // const cartRef = useRef(JSON.parse(localStorage.getItem("cart")) || []);

  // const handleAddToCartRef = (product) => {
  //   cartRef.current = [
  //     ...cartRef.current,
  //     {
  //       id: product.id,
  //       name: product.name,
  //       price: product.price,
  //       qty: 1,
  //       total: product.price,
  //     },
  //   ];
  //   localStorage.setItem("cart", JSON.stringify(cartRef.current));
  // };

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);

  const totalPriceRef = useRef(null);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      totalPriceRef.current.style.display = "";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1, total: (item.qty + 1) * item.price }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            title: product.title, 
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
      <div className="w-full mx-5 my-20 md:w-[95%]">
        {/* Bungkus utama dengan flex untuk kiri-kanan */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- Kiri: Product List --- */}
          <div className="flex-1">
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
              {products.length > 0 &&
                products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    handleAddToCart={handleAddToCart}
                  />
                ))}
            </div>
          </div>

          {/* --- Kanan: Cart Table --- */}
          <div className="w-full lg:w-1/3">
            <h1 className="text-3xl font-bold text-amber-500 mb-3">Cart</h1>
            <table className="table-fixed w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="w-1/4 border border-gray-300 p-1">Nama</th>
                  <th className="w-1/6 border border-gray-300 p-1">Price</th>
                  <th className="w-1/6 border border-gray-300 p-1">Qty</th>
                  <th className="w-1/4 border border-gray-300 p-1">Total</th>
                  <th className="w-1/6 border border-gray-300 p-1">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-gray-300 p-2 truncate">
                      {item.title}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ${item.price}
                    </td>
                    <td className="border border-gray-300 p-2">{item.qty}</td>
                    <td className="border border-gray-300 p-2">
                      ${item.total.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        onClick={() => handleDeleteFromCart(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr ref={totalPriceRef}>
                  <td
                    className="border border-gray-300 text-center p-2"
                    colSpan={5}
                  >
                    <b>Total Price:</b> ${totalPrice.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
