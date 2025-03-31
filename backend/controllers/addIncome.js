const { z } = require("zod");
const IncomeSchema = require("../models/income");

// 🔹 Income Validation Schema
const incomeValidationSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    amount: z.number().positive("Amount must be a positive number"),
    category: z.string().min(3, "Category must be at least 3 characters long"),
    description: z.string().min(5, "Description must be at least 5 characters long"),
    date: z.string().regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Invalid date format, use 'YYYY-MM-DD'"
    ).transform((value) => new Date(value)), // Auto-convert to Date
});

// 🔹 Add a New Income
exports.addIncome = async (req, res) => {
    try {
        const validatedData = incomeValidationSchema.parse(req.body);
        validatedData.userId = req.user.id; // Assign the logged-in user

        const income = new IncomeSchema(validatedData);
        await income.save();

        res.status(201).json({ message: "Income added successfully", income });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        console.error("Error adding income:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// 🔹 Get User's Income
exports.getIncome = async (req, res) => {
    try {
        const income = await IncomeSchema.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(income);
    } catch (error) {
        console.error("Error fetching income:", error);
        res.status(500).json({ msg: "Server error" });
    }
};

// 🔹 Delete an Income Entry
exports.deleteIncome = async (req, res) => {
    try {
        console.log("Request Params:", req.params);
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ msg: "Invalid ID" });
        }

        const income = await IncomeSchema.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!income) {
            return res.status(404).json({ msg: "Income not found or unauthorized" });
        }

        res.status(200).json({ msg: "Income deleted successfully" });
    } catch (error) {
        console.error("Error deleting income:", error);
        res.status(500).json({ error: "Server error" });
    }
};
