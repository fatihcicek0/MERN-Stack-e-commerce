const mongoose = require('mongoose');
const Product = require('../model/product');
const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    cart: [
        {
            productId: {
                required: true,
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                required: true,
                type: Number
            }
        }
    ]
});

userSchema.methods.addToCart = function (productId) {
    const index = this.cart.findIndex(cartproduct => {
        return cartproduct.productId.toString() === productId.toString();
    });

    const updatedCart = [...this.cart];
    let itemQuantity = 1;
    if (index >= 0) {
        itemQuantity = this.cart[index].quantity + 1;
        updatedCart[index].quantity = itemQuantity;
    } else {
        updatedCart.push({
            productId: productId,
            quantity: itemQuantity
        });
    }
    this.cart = updatedCart;
    this.save();
}

userSchema.methods.getCart = function (product) {
    const ids = this.cart.map(i => {
        return i.productId
    })
    return Product.find({
        _id: {
            $in: ids
        }
    }).select('name price imgUrl')
        .then(products => {
            return products.map(p => {
                return {
                    productId: p._id,
                    name: p.name,
                    price: p.price,
                    imgUrl: p.imgUrl,
                    quantity: this.cart.find(i => {
                        return i.productId.toString() === p._id.toString()
                    }).quantity
                }
            })
        }).catch(err => { console.log(err) });
}
userSchema.methods.deleteCartItem = function (productId) {
    const cart = this.cart.filter(item => {
        return item.productId != productId
    });
    this.cart = cart;
    return this.save();
}
userSchema.methods.clearCart = function () {
    this.cart = [];
    this.save();
}
module.exports = mongoose.model('User', userSchema);