const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength:15,
      lowecase:true
    },
    description: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength:30,
    },
    address: {
      type: String,
      required: true,
      maxLength:15,
    },
    price: {
      type: Number,
      required: true,
      minLength:5,
    },
    discount: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    image: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);
const listingModel=mongoose.model('Listing',listingSchema);
module.exports=listingModel;
