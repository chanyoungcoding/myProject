const express = require('express');

const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "/views")); 

app.get('/', (req,res) => {
  res.render('index')
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