import React, { useEffect, useRef, useState } from "react";
import { ProductCard } from "./ProductCard";
import { getProducts } from "@/services/product.service";
import { TableCart } from "./TableCart";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });
  }, []);

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

                  />
                ))}
            </div>
          </div>

          {/* --- Kanan: Cart Table --- */}
          <div className="w-full lg:w-1/3">
            <h1 className="text-3xl font-bold text-amber-500 mb-3">Cart</h1>
            <TableCart products={products} />
          </div>
        </div>
      </div>
    </>
  );
};
