import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { DarkModeProvider } from "@/context/DarkMode"; // Import provider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <DarkModeProvider> {/* Gunakan provider yang benar */}
        <RouterProvider router={router} />
      </DarkModeProvider>
    </Provider>
  </StrictMode>
);