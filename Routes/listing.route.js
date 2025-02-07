const express = require("express");
const listingRoutes = express.Router();

const {
  createListing,
  deleteListing,
  updateListing,
  allListing,
} = require("../Controllers/listing.controller");
const upload = require("../middlewares/multer");
const { checkId } = require("../middlewares/checkId");

listingRoutes
  .route("/")
  .post(upload.single("image"), createListing)
  .get(allListing);

listingRoutes
  .route("/:id")
  .delete(checkId, deleteListing)
  .put(checkId, updateListing);

module.exports = listingRoutes;
