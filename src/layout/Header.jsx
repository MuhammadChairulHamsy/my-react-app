import React from "react";

const Header = () => {
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.href = "/login";
  };
  return (
    <header className="bg-amber-300">
      <div className="flex items-center justify-end gap-5">
        <span className="text-slate-500 font-bold text-lg">{email}</span>
        <div className="my-4 mr-20">
          <button
            className="text-blue-400 border-1 px-4 py-2 shadow-md bg-slate-50 rounded-md  font-bold hover:text-blue-800"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
