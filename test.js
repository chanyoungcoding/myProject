const express = require('express');
const app = express();

const dogRoute = require("./Router/routerTest");
const adminRoute = require('./Router/routerTest2');

app.use('/dogs', dogRoute);
app.use('/admin', adminRoute);

app.listen('4040', (req,res) => {
  console.log('test server')
})