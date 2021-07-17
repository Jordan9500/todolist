const jwt = require('jsonwebtoken');

const JWT_SECRET = "topsecret"

module.exports.createToken = (id, email) => {
    const token = jwt.sign({
        userId: id,
        email: email,
    }, JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' });
    return token;
}
