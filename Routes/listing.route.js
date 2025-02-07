const express=require('express')
const listingRoutes=express.Router()

const createListing = require('../Controllers/listing.controller')
const upload=require('../middlewares/multer')

listingRoutes.route('/').post(upload.single('image'),createListing)

module.exports=listingRoutes