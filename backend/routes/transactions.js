const express = require('express');
const { addExpense, getExpenses, deleteExpense } = require('../controllers/addExpense');
const { addIncome, getIncome, deleteIncome } = require('../controllers/addIncome');
const authenticateToken = require('../auth-system/middlewareAuth');

const router = express.Router();


router.post('/add-income', authenticateToken, addIncome);
router.get('/get-income', authenticateToken, getIncome);
router.delete('/delete-income/:id', authenticateToken, deleteIncome);

router.post('/add-expense', authenticateToken, addExpense);
router.get('/get-expense', authenticateToken, getExpenses);
router.delete('/delete-expense/:id', authenticateToken, deleteExpense);

module.exports = router;
