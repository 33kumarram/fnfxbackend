const asyncHandler = require('express-async-handler')
const Products = require("../models/productModel")


const fetchProductsByCategory= asyncHandler(async(req, res)=>{
    try{
        const category = req.params.category
     const products = await Products.find({category})
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
      ]);

      res.status(201).json(categories)
      
    }catch(error){
        res.status(400)
        console.log(error)
        throw new Error("Error occurred while fetching categories")
    }
})

module.exports = {
    fetchProductsByCategory,
    fetchCategories
}