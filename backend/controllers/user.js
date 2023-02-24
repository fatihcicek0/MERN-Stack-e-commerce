const Product = require("../model/product");
const fs = require('fs');

exports.getProductsByUserId = (req, res) => {
    const { userId } = req.params;
    Product.find({ userId: userId })
        .then(products => {
            res.send({
                products
            })
        }).catch(err => { console.log(err) });
}

exports.addProduct = (req, res) => {
    const { name, description, price, userId, categoryId } = req.body;
    const imgUrl = req.file;
    const newProduct = new Product({
        name: name, description: description, price: price,
        userId: userId, categoryId: categoryId, imgUrl: imgUrl.filename
    })
    newProduct.save()
        .then(() => {
            res.send({
                message: 'product added !'
            })
        }).catch(err => { console.log(err) });
}

exports.deleteProduct = (req, res) => {
    const { productId } = req.params;
    Product.findOne({ _id: productId })
        .then(product => {
            if (!product) {
                return res.send({
                    message: 'the product requested to be deleted could not be found !'
                })
            } else {
                fs.unlink('public/img/' + product.imgUrl, err => {
                    err && console.log(err);
                })
                product.deleteOne({ _id: productId });
                res.send({ message: 'deleted!' });
            }
        }).catch(err => { console.log(err) });
}
exports.updateProduct = (req, res) => {
    const { productId, name, description, price, categoryId } = req.body;
    const imgUrl = req.file;
    console.log(req.body);
    Product.findOne({ _id: productId })
        .then(product => {
            product.name = name;
            product.description = description;
            product.price = price;
            product.categoryId = categoryId;

            if (imgUrl) {
                fs.unlink('public/img/' + product.imgUrl, err => {
                    err && console.log(err);
                })
                product.imgUrl = imgUrl.filename;
            }

            res.send({
                message: 'updated !'
            })
            return product.save();
        }).catch(err => { console.log(err) });
}