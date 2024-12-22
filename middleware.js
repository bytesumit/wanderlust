const Listing = require("./models/Listing");
const Review = require("./models/Reviews");


module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.currUrl = req.originalUrl;
        req.flash("error", "You must be login");
        return res.redirect('/login');
    };
    next(); 
};

module.exports.originalUrl = (req,res,next)=>{
    if(req.session.currUrl){
        res.locals.currUrl = req.session.currUrl;     
    };
    next();
    
};

module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let a = res.locals.currentUser && res.locals.currentUser._id.equals(listing.owner._id);
    if(!a){
        req.flash("error" ,"You not have the permission to make changes");
        return res.redirect(`/listing/${id}`);
    }
    next();
},

module.exports.isReviewAuthor = async (req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    let a = res.locals.currentUser && res.locals.currentUser._id.equals(review.author._id);
    if(!a){
        console.log(res.locals.currentUser );
        req.flash("error" ,"You are not the author to make changes");
        return res.redirect(`/listing/${id}`);
    }
    next();
}