const express = require("express");
const router = express.Router({mergeParams: true});

//내가 불러온 것
const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const Review = require("../models/review");
const { validateReview, isLoggedIn } = require('../utils/middleware')

router.post("/", isLoggedIn ,validateReview , catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete("/:reviewId", catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;