const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "/views"));

app.get('/test', (req,res) => {
    res.send('hello')
})

app.listen(4040, () => {
    console.log('테스트 서버 연결')
})