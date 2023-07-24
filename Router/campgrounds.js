const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest : 'uploads/'});

//controllers
const campgrounds = require('../controllers/campgrounds')

//내가 불러온 것
const Campground = require("../models/campground");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateCampground, isAuthor } = require('../utils/middleware');

//Route

router.route('/')
  .get(catchAsync(campgrounds.indexCampground))
  .post(upload.single('image') ,validateCampground, catchAsync(campgrounds.createNewCampground))

router.get("/new", isLoggedIn , campgrounds.newCampground);

router.route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggedIn , isAuthor , validateCampground , catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn , isAuthor , catchAsync(campgrounds.deleteCampground))

router.get("/:id/edit", isLoggedIn , isAuthor ,catchAsync(campgrounds.editCampground));

module.exports = router