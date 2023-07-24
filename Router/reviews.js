const express = require("express");
const router = express.Router({mergeParams: true});

//내가 불러온 것
const review = require('../controllers/reviews');

const catchAsync = require("../utils/catchAsync");
const { validateReview, isLoggedIn } = require('../utils/middleware')

router.post("/", isLoggedIn ,validateReview , catchAsync(review.postReview));

router.delete("/:reviewId", isLoggedIn ,catchAsync(review.deleteReview));

module.exports = router;