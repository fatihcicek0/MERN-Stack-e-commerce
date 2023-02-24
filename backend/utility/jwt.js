const jwt = require('jsonwebtoken');

const jwtVerify = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, 'secret_key', (err, decoded) => {
            if (err) {
                return res.send({
                    err
                })
            } else {
                next();
            }
        })
    } else {
        return res.send({
            message: 'token bulunmamaktadır !'
        })
    }
}
module.exports = { jwtVerify };