const Listing = require("../models/listing.js");



module.exports.index = async(req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {

    res.render("./listings/new.ejs");
};

module.exports.showListing = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author", } }).populate("owner"); // populate use to  show  the data otherwise show only  id of the database in relation model
    if (!listing) {
        req.flash("error", "Listing does not exist!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("./listings/show.ejs", { listing });
};


module.exports.createListing = async(req, res, next) => {

    let listing = req.body.listing;
    // if (!listing) {
    //     throw new ExpressError(400, "Send valid data");
    // }

    // scema validation
    // if (!newListing.description) {
    //     throw new ExpressError(400, "Descripton is missing");
    // }
    // if (!newListing.title) {
    //     throw new ExpressError(400, "Title is missing");
    // }
    // if (!newListing.location) {
    //     throw new ExpressError(400, "Location is missing");
    // }
    // if (!newListing.price) {
    //     throw new ExpressError(400, "Price is missing");
    // }
    // if (!newListing.country) {
    //     throw new ExpressError(400, "Country is missing");
    // }

    //schema validation using joi api
    // let result = listingSchema.validate(req.body);
    // console.log(result);
    // if (result.error) {
    //     throw new ExpressError(400, result.error);
    // }
    let url = req.file.path;
    let filename = req.file.filename;
    //console.log(url, "..", filename);
    const newListing = new Listing(listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");

};


module.exports.renderEditForm = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing does not exist!");
        res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("./listings/edit.ejs", { listing, originalImageUrl });
};


module.exports.updateListing = async(req, res) => {
    // if (!req.body.listing) {
    //     throw new ExpressError(400, "Send valid data");
    // }
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing }); //deconstruct 
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect("/listings/" + id);
};


module.exports.destroyListing = async(req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing)
    req.flash("success", "Listing Deleted!");

    res.redirect("/listings");
};