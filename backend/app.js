// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/transactions')
const middlewareAuth = require("./auth-system/middlewareAuth")
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/',middlewareAuth, protectedRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URl)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch(err => console.error(err));
