const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const { jwtVerify } = require('../utility/jwt');

router.get('/product/user/:userId', jwtVerify, userController.getProductsByUserId);

router.post('/product', jwtVerify, userController.addProduct);

router.delete('/product/:productId', jwtVerify, userController.deleteProduct);

router.put('/product', jwtVerify, userController.updateProduct);

module.exports = router;