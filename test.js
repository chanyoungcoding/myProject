const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('./testmongose');

//MongoDB 연결
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/test")
.then(() => {
  console.log("MongoDB Connection!!");
})
.catch((e) => {
  console.log(e);
});

const app = express();

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended : true }))

app.get('/test', (req,res) => {
  res.send('hello')
})

app.get('/sign', (req,res) => {
  res.render('test');
})

app.get('/login', (req,res) => {
  res.render('test2');
})

app.post('/sign', async(req,res) => {
  const {password, username} = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = new User({
    username,
    password: hash
  });
  await user.save();
  res.send('sign success!!')
})

app.post('/login', async (req,res) => {
  const {password, username} = req.body;
  const user = await User.findOne({ username })
  const validUser = await bcrypt.compare(password, user.password);
  if(validUser) res.send('환영합니다.')
  else res.send('로그인 실패')
})

app.listen(4040, () => {
  console.log('테스트 서버 연결')
})