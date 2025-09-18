// components/Header.jsx
import { useLogin } from "@/hooks/useLogin";
import { ShoppingCart, User, LogOut, Moon, Sun } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import DarkModeContext from "@/context/DarkMode";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [totalCart, setTotalCart] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cart = useSelector((state) => state.cart.data);

  const context = useContext(DarkModeContext);

  const { isDarkMode, toggleDarkMode } = context;

  useEffect(() => {
    const sum = cart.reduce((acc, item) => {
      return acc + item.qty;
    }, 0);

    // Trigger animation when cart count changes
    if (sum !== totalCart) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }

    setTotalCart(sum);
  }, [cart, totalCart]);

  const username = useLogin();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleToggle = () => {
    toggleDarkMode();
  };

  return (
    <header className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand Section */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white drop-shadow-md">
              🛍️ MyShop
            </h1>
          </div>

          {/* User Actions Section */}
          <div className="flex items-center gap-6">
            {/* Dark Mode Toggle */}
            <Button
              variant="outline"
              size="icon"
              onClick={handleToggle}
              className={`rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
                isDarkMode
                  ? "bg-gray-700/80 backdrop-blur-sm border-gray-600 text-yellow-400 hover:bg-gray-600/80 hover:text-yellow-300"
                  : "bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:text-white"
              }`}
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 transition-transform duration-300 hover:rotate-180" />
              ) : (
                <Moon className="h-4 w-4 transition-transform duration-300 hover:-rotate-12" />
              )}
            </Button>

            {/* User Info */}
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              <User className="w-4 h-4" />
              <span className="font-semibold text-sm">Halo, {username}</span>
            </div>
            {/* Shopping Cart */}
            <div className="relative group">
              <div
                className={`flex items-center gap-2 bg-white rounded-full px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  isAnimating ? "animate-bounce" : ""
                }`}
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-amber-600" />
                  {/* Cart Badge */}
                  {totalCart > 0 && (
                    <div
                      className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse ${
                        isAnimating ? "animate-ping" : ""
                      }`}
                    >
                      {totalCart > 99 ? "99+" : totalCart}
                    </div>
                  )}
                </div>
                <span className="font-semibold text-amber-700 hidden sm:block">
                  Keranjang
                </span>
              </div>

              {/* Hover Tooltip */}
              <div
                className={`absolute right-0 top-full mt-2 px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 ${
                  isDarkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-800 text-white"
                }`}
              >
                {totalCart === 0
                  ? "Keranjang kosong"
                  : `${totalCart} item dalam keranjang`}
                <div
                  className={`absolute -top-1 right-4 w-2 h-2 rotate-45 ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-800"
                  }`}
                ></div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
    </header>
  );
};
