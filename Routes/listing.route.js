const express=require('express')
const listingRoutes=express.Router()

const {createListing,deleteListing} = require('../Controllers/listing.controller')
const upload=require('../middlewares/multer')

listingRoutes.route('/')
.post(upload.single('image'),createListing)

listingRoutes.delete('/:id',deleteListing);

module.exports=listingRoutes