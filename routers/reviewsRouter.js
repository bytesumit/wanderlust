const express = require('express');
const wrapAsync =   require('../util/wrapAsync.js');
const { isLoggedIn, isReviewAuthor } = require('../middleware.js');
const router = express.Router({mergeParams : true});
const reviewController = require('../controllers/review.js');


// Review Route
// review Post Route
 router.post('/',isLoggedIn,wrapAsync(reviewController.createreview));

// review Delete route 

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;


