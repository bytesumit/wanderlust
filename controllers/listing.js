const Listing = require("../models/Listing");
const ExpressError = require('../util/ExpressError.js');
const {listingSchema} = require('../validtaeSchema.js');


module.exports.index =async (req,res)=>{
    const allListings = await Listing.find({});
    res.render('./listings/index.ejs',{allListings})
};

module.exports.createListingForm =  (req,res)=>{
    res.render('./listings/addForm.ejs');
 };

 module.exports.showListing = async (req,res)=>{
     let {id}  =  req.params;
     const idList = await Listing.findById(id)
     .populate({path : "reviews", populate: {path : "author"}}).populate("owner");
     if(!idList){
         req.flash('error','Your request listing is not Exists');
        return  res.redirect('/listing');
     }
     res.render('./listings/show.ejs',{idList})
 };

 module.exports.createListing = async (req,res)=>{
    let data = req.body;
    let url  = req.file.path;
    let filename = req.file.filename;
    let obj = {
        title : data.title,
        description : data.description,
        price : data.price,
        location : data.location,
        country :  data.country,
    };
    obj.owner = req.user._id;
    obj.image = {url,filename};
    let a = listingSchema.validate(obj);
    if(a.error){
      throw new ExpressError(401,a.error);
    }else{
    await Listing.insertMany([obj]);
    req.flash('success', 'New Listing was Created !');
    res.redirect('/listing');
    }
};

module.exports.editListingForm = async (req,res)=>{
    let {id} = req.params;
    const user =   await Listing.findById(id);
    if(!user){
        req.flash('error','Your request listing is not Exists');
       return res.redirect('/listing');
    }
    let originalImage = user.image.url.replace('upload','upload/w_200');
    res.render('./listings/edit.ejs',{user,originalImage});
    
};      

module.exports.updateListing = async (req,res)=>{
    let data = req.body;
    let obj = {
        title : data.title,
        description : data.description,
        price : data.price,
        location : data.location,
        country :  data.country,
    };
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...obj});
    if(typeof req.file !== 'undefined'){
        let url  = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    };
    
    req.flash('success', ' your  Listing was updated !');
    res.redirect(`/listing/${id}`);
};

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success',  ' your Listing was Deleted !');
    res.redirect('/listing');
}