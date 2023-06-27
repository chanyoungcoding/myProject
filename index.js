const express = require('express');

const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended : true }))

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "/views"));

//유저 정보
let users = [
  {
    username:'chan',
    email:'white1614@naver.com'
  },
  {
    username:'kim',
    email:'kim1614@naver.com'
  },
  {
    username:'young',
    email:'young@naver.com'
  },
]

//템플릿에 데이터 전달하기
app.get('/', (req,res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  const fruits = ['apple', 'banana', 'orange']
  res.render('index', { num, fruits})
})

app.get('/login', (req,res) => {
  res.render('login')
})

app.post('/loginexample', (req,res) => {
  console.log(req.body)
  res.send('로그인 성공')
})

//유저 생성
app.get('/userInformation', (req,res) => {
  res.render('userInformation',{users})
})

app.get('/newUser', (req,res) => {
  res.render('newUser')
})

app.post('/newuser', (req,res) => {
  const {username, email} = req.body;
  users.push({username, email})
  res.redirect("userInformation");
})


//params
app.get('/r/:subreddit/:postId', (req,res) => {
  const {subreddit, postId} = req.params;
  console.log(req.params) 
  res.send(`this is ${subreddit} and ${postId}`);
})

//query
app.get('/cat', (req,res) => {
  console.log(req.query);
  res.send('query')
})

app.get('*', (req,res) => {
  res.send('잘못된 페이지이거나, 오류가 발생했습니다.')
})

app.listen(8080, () => {
  console.log("Server 8080 Start!!")
})