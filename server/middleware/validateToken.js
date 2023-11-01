const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            success: false,
            data: null,
            message: 'Unauthorized'
        });
    }

    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                data: null,
                message: 'Unauthorized'
            });
        }

        req.user = decoded;
        next();
    });
}


module.exports = validateToken;