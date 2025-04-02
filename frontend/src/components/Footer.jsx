import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiCreditCard, FiBarChart2, FiLogOut, FiPlusCircle } from "react-icons/fi";

const Footer = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 w-full bg-white shadow-md py-3 flex justify-around items-center border-t">
      <Link
        to="/home"
        className={`flex flex-col items-center text-xs px-3 py-2 rounded-md transition-all ${
  location.pathname === "/home" ? "bg-purple-100 text-purple-600" : "text-gray-500 hover:bg-gray-100 hover:text-purple-600"
        }`}
      >
        <FiHome className="text-xl" />
        <span>Home</span>
      </Link>

      <Link
        to="/expenses"
        className={`flex flex-col items-center text-xs px-3 py-2 rounded-md transition-all ${
  location.pathname === "/expenses" ? "bg-purple-100 text-purple-600" : "text-gray-500 hover:bg-gray-100 hover:text-purple-600"
        }`}
      >
        <FiCreditCard className="text-xl" />
        <span>Expenses</span>
      </Link>

      {/* Add Transaction Button in the Center */}
      <Link
        to="/addtransaction"
        className="absolute bottom-10 bg-purple-600 p-4 rounded-full shadow-lg transform hover:scale-110 transition-all"
      >
        <FiPlusCircle className="text-white text-3xl" />
      </Link>

      <Link
        to="/incomes"
        className={`flex flex-col items-center text-xs px-3 py-2 rounded-md transition-all ${
  location.pathname === "/incomes" ? "bg-purple-100 text-purple-600" : "text-gray-500 hover:bg-gray-100 hover:text-purple-600"
        }`}
      >
        <FiBarChart2 className="text-xl" />
        <span>Incomes</span>
      </Link>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="flex flex-col items-center text-xs px-3 py-2 rounded-md transition-all text-gray-500 hover:bg-red-100 hover:text-red-600"
      >
        <FiLogOut className="text-xl" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Footer;