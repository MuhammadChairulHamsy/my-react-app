import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/layout/Header";

function HomePage() {
  return (
    <>
      <Header/>
      <div className="mt-20 mx-20 flex gap-2">
        {/* Card 1 */}
        <div className="group bottom-1 bg-slate-500 hover:bg-amber-300 p-2 rounded-md       transition-all duration-500 ease-in-out cursor-pointer">
          <Link
            to="/products"
            className="flex items-center gap-2 text-slate-50 group-hover:text-slate-900 transition-all duration-500 ease-in-out"
          >
            <ShoppingBasket className="w-5 h-5" />
            <span className="font-semibold">Products</span>
          </Link>
        </div>

        {/* Card 2 */}
        <div className="group bottom-1 bg-slate-500 hover:bg-amber-300 p-2 rounded-md transition-all duration-300 ease-in-out cursor-pointer">
          <Link
            to="/products"
            className="flex items-center gap-2 text-slate-50 group-hover:text-slate-900 transition-all duration-300 ease-in-out"
          >
            <ShoppingBasket className="w-5 h-5" />
            <span className="font-semibold">Products</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default HomePage;
