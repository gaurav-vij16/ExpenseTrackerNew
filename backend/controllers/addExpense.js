const { z } = require("zod");
const ExpenseSchema = require("../models/expense");

// 🔹 Strict Date Validation (YYYY-MM-DD)
const expenseValidationSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    amount: z.number().positive("Amount must be a positive number"),
    category: z.string().min(3, "Category must be at least 3 characters long"),
    description: z.string().min(5, "Description must be at least 5 characters long"),
    date: z.string().regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Invalid date format, use 'YYYY-MM-DD'"
    ).transform((value) => new Date(value)), // Auto-convert to Date
});

// 🔹 Add a New Expense
exports.addExpense = async (req, res) => {
    try {
        const validatedData = expenseValidationSchema.parse(req.body);
        validatedData.userId = req.user.id; // Assign the logged-in user

        const expense = new ExpenseSchema(validatedData);
        await expense.save();

        res.status(201).json({ message: "Expense added successfully", expense });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error("Error adding expense:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// 🔹 Get User's Expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

// 🔹 Delete an Expense
exports.deleteExpense = async (req, res) => {
    try {
        console.log("Request Params:", req.params);
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ msg: "Invalid ID" });
        }

        const expense = await ExpenseSchema.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!expense) {
            return res.status(404).json({ msg: "Expense not found or unauthorized" });
        }

        res.status(200).json({ msg: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ error: "Server error" });
    }
};
