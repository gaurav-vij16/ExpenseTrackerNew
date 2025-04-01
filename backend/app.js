const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/transactions');
const middlewareAuth = require("./auth-system/middlewareAuth");
const path = require("path");
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/', middlewareAuth, protectedRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});


// Database connection
mongoose.connect(process.env.DB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Database connection error:", err);
        process.exit(1);
    });
