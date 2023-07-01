const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
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

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/img")));
app.use(express.static(path.join(__dirname, "/js")));

app.use(express.urlencoded({ extended : true }))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "/views"));

//Route

app.get('/campground', async(req,res) => {
  const camp = new Campground({title:'찬영캠프', price: 30000, description:'아주좋은캠핑장입니다.', location:'서울시중랑구'})
  await camp.save();
  res.send(camp);
})

app.get('*', (req,res) => {
  res.send('잘못된 페이지이거나, 오류가 발생했습니다.')
})

app.listen(8080, () => {
  console.log("Server 8080 Start!!")
})