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

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: [20, '20글자 이상은 넘길 수 없습니다.'],  // 잘못된 정보면 뒤에 글자가 오류로 출력
    enum: ['Super bike', 'middle bike', 'small bike']  // 이 것들만 입력할 수 있슴.
  },
  price: {
    type: Number,
    min: 0,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
});

//나만의 인스턴스 메서드 정의하기
productSchema.methods.hello = function() {
  console.log('프로덕트를 찾앗습니다.')
  console.log(`이 프로덕트의 이름은 ${this.name} 입니다.`)
}

// 나만의 정적 메서드 정의하기
productSchema.statics.firePrice = function() {
  return this.updateMany({}, { price: 100 });
};

const Product = mongoose.model("Product", productSchema);

const foundBike = async() => {
  const newBike = await Product.findOne({name:'Super Bike'})
  newBike.hello();
}

foundBike();

Product.firePrice().then(res => console.log(res))

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