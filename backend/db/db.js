const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const db = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = { db };  
