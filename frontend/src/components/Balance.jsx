import React, { useEffect, useState } from "react";
import { fetchExpense } from "../helper/getExpense";
import { fetchIncome } from "../helper/getIncome";

const Balance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const calculateBalance = async () => {
      const currIncome = await fetchIncome();
      const currExpense = await fetchExpense();

      
      const totalIncome = currIncome.reduce((sum, income) => sum + income.amount, 0);
      const totalExpense = currExpense.reduce((sum , expense) => sum + expense.amount,0);

      setBalance(totalIncome-totalExpense);
    };

    calculateBalance();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="bg-white shadow-md rounded-lg p-4 text-center w-full max-w-md md:max-w-lg lg:max-w-xl">
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-700">
          Balance
        </h1>
        <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-800">
          ₹{balance.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Balance;
