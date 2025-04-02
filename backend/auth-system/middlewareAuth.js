const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Access denied: Invalid token' });
        }

        console.log("Decoded Token:", decoded); // 🔍 Debugging

        if (!decoded.id) {
            return res.status(403).json({ message: 'Invalid token: User ID missing' });
        }

        req.user = { id: decoded.id }; 
        next();
    });
};

module.exports = authenticateToken;
