const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 50 },
    amount: { type: Number, required: true, min: 1, max: 100000 },
    type: { type: String, default: "expense" }, // ✅ Ensures it's labeled as "expense"
    date: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Ensures expenses are linked to users
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
