import { ProductList } from "@/components/ProductList";
import { Header } from "@/layout/Header";
import DarkModeContext from "@/context/DarkMode";
import { useContext } from "react";

export const ProductsPage = () => {
  const context = useContext(DarkModeContext);

  const { isDarkMode } = context;

  return (
    <>
      <Header />
      <div
        className={`relative min-h-screen transition-all duration-500 ease-in-out ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-900 via-gray-900 to-black "
            : "bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100"
        }`}
      >
        <ProductList />
      </div>
    </>
  );
};
