const joi = require('joi');

module.exports.listingSchema = joi.object({
        title:joi.string().required(),
        description :joi.string().required(),
        image: joi.object({
                url: joi.string().allow("", null),
                filename: joi.string().allow("", null)
            }).required(), 
        price :  joi.number().required().min(0),
        location : joi.string().required(),
        country : joi.string().required(),
        owner : joi.allow(),


});                 