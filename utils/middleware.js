const ExpressError = require("../utils/ExpressError");
const { campgroundSchema } = require("../utils/schemas");
const Campground = require("../models/campground");

//로그인 확인
const isLoggedIn = (req,res,next) => {
  if(!req.isAuthenticated()) {
    req.flash('error', '로그인을 하세요.');
    return res.redirect('/login');
  }
  next();
}

//Joi 유효성 검사
const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((x) => x.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// postman 악용 방지
const isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if(!campground.author.equals(req.user._id)) {
    req.flash('error', '권한이 없습니다.')
    return res.redirect(`/campgrounds/${id}`)
  }
  next();
}

module.exports = {
  isLoggedIn,
  validateCampground,
  isAuthor
}