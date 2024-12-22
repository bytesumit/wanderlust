const mongoose = require('mongoose');
const Review = require('./Reviews.js');
const Link = "https://images.app.goo.gl/CFUdDRtEkhXZhof1A";
const { Schema} = mongoose;

const ListingSchema = new mongoose.Schema({
    title : {
        type : String,
    },
    description : {
        type : String,
        required : true,
    },
    image : {
        filename: { type: String,},
        url: { type: String},
       
    },
    price :{
        type : String,
        required : true,
    },
    location :{
        type : String,
        required : true,
    },
    country : {
        type : String,
        require : true
    },
    reviews : [{
        type : Schema.Types.ObjectId,
         ref: 'Review' 
    }],
    owner : {
        type : Schema.Types.ObjectId,
        ref: 'User' 
    }
});

// mongoose MiddleWare
ListingSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
      await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
  });
  
const Listing = mongoose.model("Listing",ListingSchema);

module.exports = Listing;