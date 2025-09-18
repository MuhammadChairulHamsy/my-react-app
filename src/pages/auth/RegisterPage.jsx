// src/pages/auth/login-page.jsx
import { RegisterForm } from "@/components/auth/register-form";
import DarkModeContext from "@/context/DarkMode";
import { useContext, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RegisterPage = () => {
  const context = useContext(DarkModeContext);

  console.log("🔍 Context dari RegisterPage:", context);

  if (!context) {
    console.error(
      "❌ DarkModeContext is undefined! Make sure RegisterPage is wrapped with DarkModeProvider"
    );
    return <div className="text-red-500 text-5xl font-bold">Error: Dark Mode Context not found</div>;
  }

  const { isDarkMode, toggleDarkMode } = context;

  useEffect(() => {
    console.log("🌙 RegisterPage - Dark Mode Updated:", isDarkMode);
  }, [isDarkMode]);

  console.log("📍 RegisterPage - Current Dark Mode Status:", isDarkMode);

  const handleToggle = () => {
    console.log("🎯 Button clicked! Calling toggleDarkMode...");
    toggleDarkMode();
  };

  return (
    <div
      className={`relative min-h-screen transition-all duration-500 ease-in-out ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-gray-900 to-black "
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100"
      }`}
    >

       {/* Dark Mode Toggle Button */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          variant="outline"
          size="icon"
          onClick={handleToggle} // PERBAIKAN: Gunakan handleToggle dengan debug
          className={`rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
            isDarkMode
              ? "bg-gray-800/80 backdrop-blur-sm border-gray-600 text-yellow-400 hover:bg-gray-700/80 hover:text-yellow-300"
              : "bg-white/80 backdrop-blur-sm border-gray-300 text-gray-700 hover:bg-gray-50/80 hover:text-gray-900"
          }`}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-180" />
          ) : (
            <Moon className="h-5 w-5 transition-transform duration-300 hover:-rotate-12" />
          )}
        </Button>
      </div>

      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};
