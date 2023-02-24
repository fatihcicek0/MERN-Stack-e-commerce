const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const path = require('path');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img');
    }, filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


app.use(multer({ storage: storage }).single('img'));

const authRouter = require('./routers/auth');
const userRouter = require('./routers/user');
const shopRouter = require('./routers/shop');

app.use(authRouter);
app.use(userRouter);
app.use(shopRouter);

app.use('/public/img', express.static('./public/img'));
app.use(express.static(path.join(__dirname, 'public/img')));

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ahmetveli:ahmetveli@cluster0.a7ff9o2.mongodb.net/e-commerce?retryWrites=true&w=majority')
    .then(() => {
        app.listen(8000, () => {
            console.log('it is okey');
        });
    }).catch(err => { console.log(err) });

