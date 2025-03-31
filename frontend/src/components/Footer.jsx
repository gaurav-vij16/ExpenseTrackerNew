import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiCreditCard, FiBarChart2, FiLogOut, FiPlusCircle } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full bg-white shadow-md py-3 flex justify-around items-center border-t">
      <Link to="/home" className="flex flex-col items-center text-xs text-gray-500 hover:text-purple-600">
        <FiHome className="text-xl" />
        <span>Home</span>
      </Link>

      <Link to="/expenses" className="flex flex-col items-center text-xs text-gray-500 hover:text-purple-600">
        <FiCreditCard className="text-xl" />
        <span>Expenses</span>
      </Link>

      {/* Add Transaction Button in the Center */}
      <Link to="/addtransaction" className="absolute bottom-10 bg-purple-600 p-4 rounded-full shadow-lg transform hover:scale-110 transition-all">
        <FiPlusCircle className="text-white text-3xl" />
      </Link>

      <Link to="/incomes" className="flex flex-col items-center text-xs text-gray-500 hover:text-purple-600">
        <FiBarChart2 className="text-xl" />
        <span>Incomes</span>
      </Link>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="flex flex-col items-center text-xs text-gray-500 hover:text-red-600"
      >
        <FiLogOut className="text-xl" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Footer;
