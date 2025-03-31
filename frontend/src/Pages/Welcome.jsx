import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to Our App 🚀</h1>
      <p className="text-lg text-gray-600 mt-3">Manage your transactions with ease. Get started now!</p>
      
      <div className="flex gap-4 mt-6">
        <Link to="/login" className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">Login</Link>
        <Link to="/signup" className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition">Sign Up</Link>
      </div>
    </div>
  );
};

export default Welcome;
