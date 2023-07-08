//라이브러리
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const Joi = require('joi');

//내가 불러온 것
const Campground = require('./models/campground');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const {campgroundSchema} = require('./utils/schemas');

//MongoDB 연결
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/chan-camp")
  .then(() => {
    console.log("MongoDB Connection!!");
  })
  .catch((e) => {
    console.log(e);
  });

  //기본적인 설정
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "img")));
app.use(express.static(path.join(__dirname, "js")));

app.use(express.urlencoded({ extended : true }))
app.use(methodOverride('_method'))

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "/views"));

//Joi 유효성 검사

const validateCampground = (req,res,next) => {
  const { error } = campgroundSchema.validate(req.body);
  if(error) {
    const msg = error.details.map(x => x.message).join(',');
    throw new ExpressError(msg, 400)
  } else {
    next();
  }
}

//Route

app.get("/campgrounds", catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("home", { campgrounds });
}));

app.get('/campgrounds/new', (req,res) => {
  res.render('campgrounds/new')
})

app.post("/campgrounds", validateCampground ,catchAsync(async (req, res, next) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect("/campgrounds");
}));

app.get("/campgrounds/:id", catchAsync(async (req, res, next) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/show", { campground });
}));

app.get("/campgrounds/:id/edit", catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
}));

app.put("/campgrounds/:id", validateCampground, catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  res.redirect(`/campgrounds/${campground._id}`);
}));

app.delete("/campgrounds/:id", catchAsync(async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
}));

app.post('/campgrounds/:id/reviews', catchAsync(async(req,res) => {
  res.send('good boy!!')
}))

app.all('*', (req, res, next) => {
  next(new ExpressError('페이지를 찾을 수 없습니다.', 404))
})

app.use((err,req,res,next) => {
  const {statusCode = 500} = err;
  if(!err.message) err.message = '잘못된 방법인것같습니다. 다시 시도해 주세요.'
  res.status(statusCode).render('error',{ err });
})

app.listen(8080, () => {
  console.log("Server 8080 Start!!")
})