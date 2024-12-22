const joi = require('joi');
module.exports.ReviewSchema = joi.object({
  comments : joi.string().required(),
  rating : joi.number().allow(),
  author : joi.allow().required(),
});                 