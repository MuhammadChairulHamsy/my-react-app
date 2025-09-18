import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import BannerSlider from "@/components/BannerSlider";
import { Header } from "@/layout/Header";
import DarkModeContext from "@/context/DarkMode";

export const HomePage = () => {
  const context = useContext(DarkModeContext);

  const { isDarkMode } = context;

  return (
    <>
      <Header />
      <main className={`relative min-h-screen transition-all duration-500 ease-in-out ${
            isDarkMode
              ? "bg-gradient-to-br from-slate-900 via-gray-900 to-black "
              : "bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100"
          }`}>
        <BannerSlider />

       
          {/* Link Cards */}
          <div className="mt-20 mx-20 flex gap-2">
            <div className="group bg-slate-500 hover:bg-amber-300 p-2 rounded-md transition-all duration-500 cursor-pointer">
              <Link
                to="/products"
                className="flex items-center gap-2 text-slate-50 group-hover:text-slate-900 transition-all duration-500"
              >
                <ShoppingBasket className="w-5 h-5" />
                <span className="font-semibold">Products</span>
              </Link>
            </div>

            <div className="group bg-slate-500 hover:bg-amber-300 p-2 rounded-md transition-all duration-300 cursor-pointer">
              <Link
                to="/products"
                className="flex items-center gap-2 text-slate-50 group-hover:text-slate-900 transition-all duration-300"
              >
                <ShoppingBasket className="w-5 h-5" />
                <span className="font-semibold">Products</span>
              </Link>
            </div>
          </div>
      </main>
    </>
  );
};
