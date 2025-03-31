import React, { useEffect, useState } from "react";
import { fetchExpense } from "../helper/getExpense";
import { fetchIncome } from "../helper/getIncome";

const RecentTransactions = ({ refresh }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const incomes = await fetchIncome();
            const expenses = await fetchExpense();

            const allTransactions = [...incomes, ...expenses]
                .map(tx => ({
                    ...tx,
                    date: new Date(tx.date) 
                }))
                .sort((a, b) => b.date - a.date); 

            setTransactions(allTransactions);
        };

        fetchTransactions();
    }, []); 

    return (
        <div className="w-full max-w-[400px] mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-3 border-b pb-2">Recent Transactions</h2>

            <div className="max-h-[500px] overflow-y-auto">
                {transactions.length > 0 ? (
                    <ul className="divide-y divide-gray-300">
                        {transactions.map((tx) => (
                            <li key={tx._id} className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-600">{tx.title}</p>
                                    <p className="text-xs text-gray-500">
                                        {tx.date.toLocaleDateString()} {/* ✅ Proper date format */}
                                    </p>
                                </div>
                                <p className={`text-lg font-semibold ${tx.type === "income" ? "text-green-500" : "text-red-500"}`}>
                                    ₹{tx.amount}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center py-4">No recent transactions</p>
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;
