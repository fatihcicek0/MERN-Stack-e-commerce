const express = require('express');
const router = express.Router();

const shopcontrollers = require('../controllers/shop');
const { jwtVerify } = require('../utility/jwt');

router.get('/product', shopcontrollers.getProducts);

router.get('/product/:productId', shopcontrollers.getProductById);

router.get('/categories', shopcontrollers.getCategories);

router.get('/product/category/:categoryId', shopcontrollers.getProductsByCategoryId);

router.get('/product/category/:categoryId/price/:lowest/:highest', shopcontrollers.getProductsByPrice);

router.get('/cart/:userId', jwtVerify, shopcontrollers.getCart);

router.post('/cart', jwtVerify, shopcontrollers.addToCart);

router.delete('/cart/:userId/:productId', jwtVerify, shopcontrollers.deleteCartItem);

router.get('/order/:userId', jwtVerify, shopcontrollers.getOrder);

router.post('/order', jwtVerify, shopcontrollers.addToOrder);

module.exports = router;