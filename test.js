const express = require('express');
const app = express();

const dogRoute = require("./Router/routerTest");

app.use('/dogs', dogRoute)

app.listen('4040', (req,res) => {
  console.log('test server')
})