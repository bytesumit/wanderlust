const express = require('express');
const wrapAsync =   require('../util/wrapAsync.js');
const {isLoggedIn,isOwner} = require('../middleware.js');
const router = express.Router();
const listingController = require('../controllers/listing.js');
const multer  = require('multer')
const {storage} = require('../cloudConfig.js');
const upload = multer({storage});

router.route('/')
// Index Route
.get(wrapAsync(listingController.index))
// Create Route
.post(isLoggedIn,(upload.single('image')),wrapAsync(listingController.createListing));

// New Route
router.get('/new',isLoggedIn ,listingController.createListingForm);

// Edit Route
router.get('/:id/edit',isLoggedIn,isOwner,wrapAsync( listingController.editListingForm));

router.route('/:id')
// Show Route
.get( wrapAsync(listingController.showListing))
// Update Route
.patch(isLoggedIn,isOwner,(upload.single('image')),
    wrapAsync(listingController.updateListing))
// Delete Route
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;