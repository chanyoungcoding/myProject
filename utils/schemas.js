const Joi = require("joi");

const campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
    price: Joi.number().required().min(0),
    // image: Joi.string().required(),
    location: Joi.string().required(),
    city:Joi.string().required(),
    phoneNumber:Joi.string().required(),
    category:Joi.string().required(),
    description: Joi.string().required(),
    wifi: Joi.string().required(),
    bed: Joi.string().required(),
    pet: Joi.string().required(),
    electricity:Joi.string().required(),
    sportsFacility:Joi.string().required(),
    check: Joi.array().items(
      Joi.string().valid('hotel', 'ocean', 'mountain', 'river', 'sight')
    ).single()
  }).required(),
  deleteImages: Joi.array()
});

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required()
  }).required()
})

module.exports = {
  campgroundSchema,
  reviewSchema
};