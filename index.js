//라이브러리
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

//내가 불러온 것
const ExpressError = require('./utils/ExpressError');

//router 불러오기
const campgrounds = require('./Router/campgrounds')
const reviews = require('./Router/reviews');

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

app.use(express.urlencoded({ extended : true }))
app.use(methodOverride('_method'))
app.use(cookieParser());
app.use(session({ secret: "thisissecret" , saveUninitialized: false, resave: false}));
app.use(flash());

//flash
app.use((req,res,next) => {
  res.locals.messages = req.flash('success');
  next();
})

// Setting
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "/views"));

//router
app.use('/campgrounds', campgrounds);
app.use("/campgrounds/:id/reviews", reviews);

// Error 페이지
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