const express = require("express")

const {fetchProductsByCategory, fetchCategories, updatePrice} = require("../controllers/productController")

const router = express.Router()

router.route('/productsbycategory/:category').get(fetchProductsByCategory)
router.route('/categories').get(fetchCategories)
router.route('/updateprice').put(updatePrice)

module.exports= router

