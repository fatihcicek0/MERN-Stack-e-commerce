const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (userId) => {
    return jwt.sign({ userId }, 'secret_key');
}
exports.Register = (req, res) => {
    const { name, email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.send({
                    message: 'bu email daha önce kullanılmıştır !'
                })
            } else {
                bcrypt.hash(password, 10)
                    .then(hashedPassword => {
                        const newUser = new User({
                            name: name, email: email, password: hashedPassword, cart: []
                        });
                        newUser.save();
                        res.send({
                            message: 'registration is successful'
                        })
                    })
            }
        }).catch(err => { console.log(err) });
}
exports.Login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password)
                    .then(comparedPassword => {
                        if (comparedPassword) {
                            const token = createToken(user.id);
                            res.send({
                                accessToken: token,
                                userId: user.id
                            })
                        } else {
                            res.send({
                                message: 'yanlış parola !'
                            })
                        }
                    }).catch(err => { console.log(err) });
            }else{
                res.send({
                    message:'Bu emaile sahip kullanıcı bulunmamaktadır !'
                })
            }
        }).catch(err => { console.log(err) });
}