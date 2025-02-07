// Model
const listingModel = require("../Models/listing.model");
// joi
const joi = require("joi");
const schema = joi.object({
  name: joi
    .string()
    .max(15)
    .required()
    .pattern(new RegExp("^[a-zA-Z]+$"))
    .message(" only alphabetic characters without spaces."),
  description: joi
    .string()
    .max(30)
    .required()
    .pattern(new RegExp("^[a-zA-Z]+$"))
    .message(" only alphabetic characters without spaces."),
  address: joi.string().max(30).required(),
  price: joi.number().required().min(5),
  discount: joi.number().optional().min(5),
  bathrooms: joi.number().required(),
  bedrooms: joi.number().required(),
  furnished: joi.boolean().optional(),
  parking: joi.boolean().optional(),
  offer: joi.boolean().optional(),
  image: joi.string().optional(),
  type: joi
    .string()
    .max(30)
    .required()
    .pattern(new RegExp("^[a-zA-Z]+$"))
    .message(" only alphabetic characters without spaces."),
});
// cloud
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const createListing = async (req, res, next) => {
  const { error, value } = schema.validate(req.body);

  if (error) {
    return next({ statusCode: 400, message: error.message });
  }
  //console.log(value);
  try {
    const {
      name,
      description,
      address,
      price,
      discount,
      bathrooms,
      bedrooms,
      furnished,
      parking,
      offer,
      type,
    } = req.body;

    const image = req.file;
    if (!image) {
      return next({ statusCode: 400, message: "No Image Found" });
    }
    let cloud = await cloudinary.uploader.upload(image.path, {
      folder: "Listing-image",
    });

    const newListing = new listingModel({
      name,
      description,
      address,
      price,
      discount,
      bathrooms,
      bedrooms,
      furnished: furnished === true ? true : false,
      parking: parking === true ? true : false,
      offer: offer === true ? true : false,
      type,
      image: cloud.secure_url,
    });
    await newListing.save();
    return res.status(201).json({ error: false, newListing });
  } catch (error) {
    console.log("Error in createListing", error);
    next(error);
  }
};
const deleteListing=async(req,res,next)=>{

}
module.exports = {createListing,deleteListing};
