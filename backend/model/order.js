const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        userId: {
            required: true,
            type: mongoose.Types.ObjectId
        },
        name: {
            required: true,
            type: String
        },
        email: {
            required: true,
            type: String
        }
    },
    orders: [
        {
            product: {
                required: true,
                type: Object
            },
            quantity: {
                required: true,
                type: Number
            }
        }
    ],
    date: {
        type: String,
        default: Date.now
    }

})

module.exports = mongoose.model('Order', orderSchema);