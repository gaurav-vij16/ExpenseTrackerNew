import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IncomeForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "income",
    description: "",
    date: "",
  });

  const api_url = import.meta.env.VITE_API_URL; 

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "date") {
      value = new Date(value).toISOString().split("T")[0]; 
    }
    if (name === "amount") {
      value = Number(value);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Token expired. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`${api_url}/api/v1/add-income`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Income added successfully:", data);
      toast.success("Income added successfully!");

      // Reset form
      setFormData({
        title: "",
        amount: "",
        category: "income",
        description: "",
        date: "",
      });
    } catch (error) {
      console.error("Error adding income:", error);
      toast.error("Failed to add income. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Add Income
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date */}
        <div>
          <label className="block text-gray-600 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-gray-600 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter title"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600 font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-600 font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            placeholder="Enter amount"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600 transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default IncomeForm;
