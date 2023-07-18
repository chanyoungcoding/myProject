//라이브러리
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

//내가 불러온 것
const ExpressError = require('./utils/ExpressError');
const User = require('./models/user');

//router
const campgroundRoutes = require('./Router/campgrounds')
const reviewRoutes = require('./Router/reviews');
const userRoutes = require('./Router/user');

//MongoDB 연결
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/chan-camp")
.then(() => {
  console.log("MongoDB Connection!!");
})
.catch((e) => {
  console.log(e);
});

const app = express();

// Setting
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "img")));
app.use(express.urlencoded({ extended : true }))
app.use(methodOverride('_method'))
app.use(flash());

const sessionConfig = {
  secret: "thisissecret",
  saveUninitialized: true,
  resave: false,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash
app.use((req,res,next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

app.use('/fakeUser', async(req,res) => {
  const user = new User({email: 'white1614@naver.com', username:'chan'});
  const newUser = await User.register(user, 'dog');
  res.send(newUser);
})

//router
app.use('/campgrounds', campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

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