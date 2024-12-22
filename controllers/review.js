const {ReviewSchema} = require('../ReviewSchemaValidate.js');
const Listing = require('../models/Listing.js')
const Review = require('../models/Reviews.js');
const ExpressError = require('../util/ExpressError.js');

module.exports.createreview = async(req,res)=>{
    let {id} = req.params;
    let {rating , comments} = req.body;
    let obj = {
        rating : rating,
        comments : comments
    }; 
    obj.author = req.user._id;
    let a = ReviewSchema.validate(obj);
    if(a.error){
        throw new ExpressError(505,a.error);
    }
    let listing = await Listing.findById(id);
    let newReview = new Review(obj);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listing/${id}`);

};

module.exports.destroyReview = async (req,res)=>{
    let {id,reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    res.redirect(`/listing/${id}`);
}