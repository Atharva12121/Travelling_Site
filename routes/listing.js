const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const ListingController = require("../controllers/listing.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage }) //destinatioon wheere the file is save

router.route("/")
    .get(wrapAsync(ListingController.index)) //index Route
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(ListingController.createListing)); //create Route
// listing[image] this is filed mane to upload fom this  field



//new route
router.get("/new", isLoggedIn, ListingController.renderNewForm);


router.route("/:id")
    .get(wrapAsync(ListingController.showListing)) //show route
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(ListingController.updateListing)) //Update rout 
    .delete(isLoggedIn, isOwner, wrapAsync(ListingController.destroyListing)); //Delete




//Edit rout
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.renderEditForm));


module.exports = router;