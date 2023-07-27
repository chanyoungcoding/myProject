const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

//controllers
const campgrounds = require('../controllers/campgrounds')

//내가 불러온 것
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, validateCampground, isAuthor } = require('../utils/middleware');

//Route

router.route('/')
  .get(catchAsync(campgrounds.indexCampground))
  .post(upload.array('image') ,validateCampground, catchAsync(campgrounds.createNewCampground))

router.get("/new", isLoggedIn , campgrounds.newCampground);

router.route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggedIn , isAuthor , validateCampground , catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn , isAuthor , catchAsync(campgrounds.deleteCampground))

router.get("/:id/edit", isLoggedIn , isAuthor ,catchAsync(campgrounds.editCampground));

module.exports = router