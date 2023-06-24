const express = require('express');

const app = express();

app.get('/', (req,res) => {
  res.send('hello world!!')
})

app.get('*', (req,res) => {
  res.send('잘못된 페이지이거나, 오류가 발생했습니다.')
})

app.listen(8080, () => {
  console.log("Server 8080 Start!!")
})