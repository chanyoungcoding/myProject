const express = require('express');
const router = express.Router();

//controllers
const campgrounds = require('../controllers/campgrounds')

//내가 불러온 것
const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateCampground, isAuthor } = require('../utils/middleware');

//Route
router.get("/", catchAsync(campgrounds.indexCampground));

router.get("/new", isLoggedIn , campgrounds.newCampground);

router.post("/", validateCampground, catchAsync(campgrounds.createNewCampground));

router.get("/:id", catchAsync(campgrounds.showCampground));

router.get("/:id/edit", isLoggedIn , isAuthor ,catchAsync(campgrounds.editCampground));

router.put("/:id", isLoggedIn , isAuthor , validateCampground , catchAsync(campgrounds.updateCampground));

router.delete("/:id", isLoggedIn , isAuthor , catchAsync(campgrounds.deleteCampground));

module.exports = router