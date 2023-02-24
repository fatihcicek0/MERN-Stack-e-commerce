const Product = require("../model/product");
const User = require("../model/user");
const Category = require("../model/category");
const Order = require('../model/order');

exports.getProducts = (req, res) => {
    Product.find()
        .then(products => {
            res.send({
                products
            })
        }).catch(err => { console.log(err) });
}
exports.getCategories = (req, res) => {
    Category.find()
        .then(categories => {
            res.send({
                categories
            });
        }).catch(err => {
            console.log(err);
        })
}
exports.getProductById = (req, res) => {
    const { productId } = req.params;
    Product.findOne({ _id: productId })
        .then(product => {
            res.send({
                product
            })
        }).catch(err => { console.log(err) });
}
exports.getProductsByCategoryId = (req, res) => {
    const { categoryId } = req.params;
    Product.find({ categoryId: categoryId })
        .then(products => {
            res.send({
                products
            })
        }).catch(err => { console.log(err) });
}
exports.getProductsByPrice = (req, res) => {
    const { lowest, highest, categoryId } = req.params;

    Product.find({
        $and: [
            {
                price: {
                    $gte: lowest,
                    $lte: highest
                }
            },
            { categoryId: categoryId }
        ]
    }).then(products => {
        res.send({
            products
        })

    }).catch(err => { console.log(err) });
}

exports.getCart = (req, res) => {
    User.findOne({ _id: req.params.userId })
        .then(user => {
            user.getCart()
                .then(cart => {
                    res.send({
                        cart
                    })
                }).catch(err => { console.log(err) });
        }).catch(err => { console.log(err) });
}

exports.addToCart = (req, res) => {
    const { userId, productId } = req.body;
    User.findOne({ _id: userId })
        .then(user => {
            user.addToCart(productId);
            res.send({ message: 'product added to cart!' });
        }).catch(err => { console.log(err) });
}

exports.deleteCartItem = (req, res) => {
    const { productId, userId } = req.params;
    User.findOne({ _id: userId })
        .then(user => {
            user.deleteCartItem(productId);
            res.send({ message: 'product deleted from cart!' });
        }).catch(err => { console.log(err) });
}
exports.getOrder = (req, res) => {
    Order.find({ 'user.userId': req.params.userId })
        .then(orders => {
            res.send({
                orders
            })
        }).catch(err => {
            console.log(err);
        })
}
exports.addToOrder = (req, res) => {
    const { userId } = req.body;
    User.findOne({ _id: userId }).populate('cart.productId')
        .then(user => {
            const newOrder = new Order({
                user: {
                    userId: userId,
                    name: user.name,
                    email: user.email
                },
                orders: user.cart.map(p => {
                    return {
                        product: {
                            _id: p.productId._id,
                            name: p.productId.name,
                            price: p.productId.price,
                            imgUrl: p.productId.imgUrl
                        },
                        quantity: p.quantity
                    }
                })
            });
            res.send({
                order: newOrder
            })
            user.clearCart();
            return newOrder.save();
        }).catch(err => { console.log(err) });
}