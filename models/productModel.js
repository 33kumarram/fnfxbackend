const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    id:{type:Number},
    name:{type:String},
    image:{type:String},
    category:{type:String},
    lable:{type:String},
    price:{type:Number},
    description:{type:String},
})

const products = mongoose.model('products', productSchema)
module.exports = products