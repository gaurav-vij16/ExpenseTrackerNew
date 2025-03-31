import React, { useEffect, useState } from "react";
import { fetchExpense } from "../helper/getExpense";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        let temp = await fetchExpense();
        setExpenses(temp);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg overflow-y-auto rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Expense Records
      </h2>

      {expenses.length === 0 ? (
        <p className="text-center text-gray-500">No expense records found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expenses.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-md bg-red-100 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold text-red-700">
                {item.title}
              </h3>
              <p className="text-gray-600">Amount: ₹{item.amount}</p>
              <p className="text-gray-500 text-sm">
                {new Date(item.date).toLocaleDateString()}
              </p>
              <p className="mt-2 text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Expenses;
