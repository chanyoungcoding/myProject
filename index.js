const express = require('express');
const {v4: uuid} = require('uuid');
const methodOverride = require('method-override');

//mongo test
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/test")
  .then(() => {
    console.log("MongoDB Connection!!");
  })
  .catch((e) => {
    console.log(e);
  });

  const movieSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    year: {
      type: Number,
    }
  })

  const Movie = mongoose.model('Movie', movieSchema)
  Movie.insertOne({title: '슈퍼밴드', year: 1998})
  .then((x) => {console.log(x)})
  .catch((e) => console.log(e))

const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/img")));
app.use(express.static(path.join(__dirname, "/js")));

app.use(express.urlencoded({ extended : true }))
app.use(methodOverride('_method'))

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "/views"));

//유저 정보
let users = [
  {
    id: uuid(),
    username: "chan",
    email: "white1614@naver.com",
  },
  {
    id: uuid(),
    username: "kim",
    email: "kim1614@naver.com",
  },
  {
    id: uuid(),
    username: "young",
    email: "young@naver.com",
  },
];

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
  users.push({username, email, id : uuid()})
  res.redirect("userInformation");
})

//특정 유저 댓글 찾기

app.get('/userComments/:id', (req,res) => {
  const {id} = req.params;
  const comments = users.find(x => x.id === id);
  res.render('userComments', {comments})
})

// 댓글 바꾸기

app.get('/patchuser/:id', (req,res) => {
  const { id } = req.params;
  const comments = users.find((x) => x.id === id);
  res.render('patchuser',{comments})
})

app.patch("/userComments/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((x) => x.id === id);
  const changeName = req.body.name;
  user.username = changeName;
  res.redirect("/userInformation");
});

// 댓글 삭제하기

app.delete("/delete/:id", (req,res) => {
  const { id } = req.params;
  const user = users.find((x) => x.id === id);
  const newUser = users.filter(x => x.id !== user.id);
  users = newUser
  res.redirect('/userInformation');
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