const express = require('express');
const router = express.Router();

//내가 불러온 것
const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateCampground, isAuthor } = require('../utils/middleware');

//Route
router.get("/", catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("home", { campgrounds });
  })
);

router.get("/new", isLoggedIn ,(req, res) => {
  res.render("campgrounds/new");
});

router.post("/", validateCampground, catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "made it");
    res.redirect("/campgrounds");
  })
);

router.get("/:id", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({path:"reviews", populate: {path:'author'}}).populate("author", "username");
    if(!campground) {
      req.flash('error', '캠프를 찾을 수 없습니다.')
      return res.redirect('/campgrounds')
    }
    res.render("campgrounds/show", { campground });
  })
);

router.get("/:id/edit", isLoggedIn , isAuthor ,catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render("campgrounds/edit", { campground });
  })
);

router.put("/:id", isLoggedIn , isAuthor , validateCampground , catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete("/:id", isLoggedIn , isAuthor , catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect("/campgrounds");
  })
);

module.exports = router