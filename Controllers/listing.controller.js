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

const deleteListing = async (req, res, next) => {
  try {
    const listing = await listingModel.findById(req.params.id);
    if (!listing) {
      return next({ statusCode: 400, message: "Listing Not Found." });
    }
    await listingModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ error: false, message: "Listing deleted." });
  } catch (error) {
    console.log("Error in deleteListing", error);
    next(error);
  }
};

const updateListing = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return next({ statusCode: 400, message: error.message });
  }
  const image = req.file;
  if (!image) {
    return next({ statusCode: 400, message: "No Image Found" });
  }
  let cloud = await cloudinary.uploader.upload(image.path, {
    folder: "Listing-image",
  });

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
    const listing = await listingModel.findById(req.params.id);
    if (!listing) {
      return next({ statusCode: 400, message: "Listing Not Found." });
    }
    if (listing.updatedAt.getDate() === new Date.getDate()) {
      return next({
        statusCode: 400,
        message: "Updated recently so wait for 24 hr.",
      });
    }
    listing.name = name || listing.name;
    listing.description = description || listing.description;
    listing.address = address || listing.address;
    listing.price = price || listing.price;
    listing.discount = discount || listing.discount;
    listing.bathrooms = bathrooms || listing.bathrooms;
    listing.bedrooms = bedrooms || listing.bedrooms;
    listing.furnished = furnished === true ? true : false || listing.furnished;
    listing.parking = parking === true ? true : false || listing.parking;
    listing.offer = offer === true ? true : false || listing.offer;
    listing.image = cloud.secure_url || listing.image;
    listing.type = type || listing.type;
    const updatedListing = await listing.save();
    return res.status(200).json({ error: false, updatedListing });
  } catch (error) {
    console.log("Error in updateListing", error);
    next(error);
  }
};
const allListing=async(req,res,next)=>{
  try {
    const listings=await listingModel.find({}).sort({name:1}).limit(10)
    return res.status(200).json({error:false,message:listings})
    
  } catch (error) {
    console.log('Error in allListing',error);
    next(error);
    
  }

}
module.exports = { createListing, deleteListing, updateListing,allListing };
