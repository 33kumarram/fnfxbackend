const express = require("express")

const {fetchProductsByCategory, fetchCategories} = require("../controllers/productController")

const router = express.Router()

router.route('/productsbycategory/:category').get(fetchProductsByCategory)
router.route('/categories').get(fetchCategories)

module.exports= router

