const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const Campground = require('./models/campground');


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

//Route

app.get('/campgrounds', async (req,res) => {
  const campgrounds = await Campground.find({});
  res.render('home', {campgrounds})
})

app.get('/campgrounds/new', (req,res) => {
  res.render('campgrounds/new')
})

app.post('/campgrounds', async (req,res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect('/campgrounds');
})

app.get('/campgrounds/:id', async (req,res) => {
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/show', {campground})
})

app.get("/campgrounds/:id/edit", async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { campground });
});

app.put("/campgrounds/:id", async (req,res) => {
  const { id } =req.params;
  const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
  res.redirect(`/campgrounds/${campground._id}`)
});

app.delete('/campgrounds/:id', async (req,res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds')
})

app.get('*', (req,res) => {
  res.send('잘못된 페이지이거나, 오류가 발생했습니다.')
})

app.listen(8080, () => {
  console.log("Server 8080 Start!!")
})