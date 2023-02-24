const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        required: true,
        type:String 
    }
});

module.exports=mongoose.model('Category',categorySchema);