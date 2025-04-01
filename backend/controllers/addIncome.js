const { z } = require("zod");
const Income = require("../models/income"); // ✅ Use correct model reference

// 🔹 Income Validation Schema
const incomeValidationSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    amount: z.number().positive("Amount must be a positive number"),
    category: z.string().min(3, "Category must be at least 3 characters long"),
    description: z.string().min(5, "Description must be at least 5 characters long"),
    date: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, use 'YYYY-MM-DD'")
        .transform((value) => new Date(value)), // Auto-convert to Date
});

// 🔹 Add a New Income Entry
exports.addIncome = async (req, res) => {
    try {
        const validatedData = incomeValidationSchema.parse(req.body);
        validatedData.userId = req.user.id; // ✅ Ensure user ID is assigned correctly

        const income = new Income(validatedData);
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

// 🔹 Get Logged-in User's Income Entries
exports.getIncome = async (req, res) => {
    try {
        const userId = req.user.id; // ✅ Ensure we're fetching income for the logged-in user
        const incomes = await Income.find({ userId }); // ✅ Make sure the query matches your schema field
        res.status(200).json(incomes);
    } catch (error) {
        console.error("Error fetching income:", error);
        res.status(500).json({ message: "Error fetching income data" });
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

        const income = await Income.findOneAndDelete({ _id: id, userId: req.user.id }); // ✅ Use correct field for user association

        if (!income) {
            return res.status(404).json({ msg: "Income not found or unauthorized" });
        }

        res.status(200).json({ msg: "Income deleted successfully" });
    } catch (error) {
        console.error("Error deleting income:", error);
        res.status(500).json({ error: "Server error" });
    }
};
