//ENV 설정
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

//라이브러리 설정
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');

const MongoDBStore = require('connect-mongo')(session);

//내가 불러온 것
const ExpressError = require('./utils/ExpressError');
const User = require('./models/user');

//router
const campgroundRoutes = require('./Router/campgrounds')
const reviewRoutes = require('./Router/reviews');
const userRoutes = require('./Router/user');

//MongoDB 연결
const mongoose = require('mongoose');
// const dbUrl = process.env.DB_URL;
const dbUrl = "mongodb://127.0.0.1:27017/chan-camp"
mongoose.connect(dbUrl)
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
app.use(mongoSanitize());

const store = new MongoDBStore({
  url: dbUrl,
  secret: 'thisismySecret',
  touchAfter: 24 * 60 * 60 
})

const sessionConfig = {
  store,
  name:'session',
  secret: "thisissecret",
  saveUninitialized: true,
  resave: false,
  cookie: {
    httpOnly: true,
    //secure: true,
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