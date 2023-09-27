const asyncHandler = require('express-async-handler')
const Products = require("../models/productModel")
const products = require('../models/productModel')


const fetchProductsByCategory= asyncHandler(async(req, res)=>{
    try{
     const category = req.params.category
        // console.log('category',category)
     const products = await Products.find({category:category}).sort({price:-1})
     res.status(201).json(products)
    }catch(err){
        console.log(err)
        res.status(400)
        throw new Error("Error occurred while fetching products")
    }
})

const fetchCategories= asyncHandler(async(req, res)=>{
    try{
      const categories = await Products.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            count: 1,
          },
        },
        {
          $sort:{category:1}
        }
      ]);

      res.status(201).json(categories)
      
    }catch(error){
        res.status(400)
        console.log(error)
        throw new Error("Error occurred while fetching categories")
    }
})

const updatePrice =asyncHandler(async(req,res)=>{
try{
 const data = req.body
//  console.log(data)
 data.map(async(product)=>{
  await products.findByIdAndUpdate(product._id,{price:product.price})
 })
 res.status(201).json({message:"price updated"})
}catch(err){
  console.log(err)
  res.status(400)
  throw new Error('Error occurred while updating price')
}
})
module.exports = {
    fetchProductsByCategory,
    fetchCategories,
    updatePrice
}