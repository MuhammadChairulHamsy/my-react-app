import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { NotFound } from "@/pages/NotFound";
import { ProductsPage } from "@/pages/products";
import { HomePage } from "@/pages/Home";
import { ProfilePage } from "@/pages/Profile";
import { DetailProductPage } from "@/pages/DetailProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/products",
    element: <ProductsPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/products/:id",
    element: <DetailProductPage />
  },
]);
