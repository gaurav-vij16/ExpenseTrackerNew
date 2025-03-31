import React, { useState } from 'react';
import IncomeForm from './IncomeForm';
import ExpenseForm from './ExpenseForm';

const Button = () => {
    const [active, setActive] = useState("Expense");

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex bg-gray-300 rounded-full w-60 p-1">
                <button 
                    className={`w-1/2 py-2 rounded-full transition-all duration-300 ${
                        active === "Expense" ? "bg-purple-900 text-white" : "text-purple-900"
                    }`}
                    onClick={() => setActive("Expense")}
                >
                    Expense
                </button>
                <button 
                    className={`w-1/2 py-2 rounded-full transition-all duration-300 ${
                        active === "Income" ? "bg-green-500 text-white" : "text-green-500"
                    }`}
                    onClick={() => setActive("Income")}
                >
                    Income
                </button>
            </div>

            {/* Conditional Rendering of Forms */}
            <div className="w-full max-w-md">
                {active === "Expense" ? <ExpenseForm /> : <IncomeForm />}
            </div>
        </div>
    );
};

export default Button;
