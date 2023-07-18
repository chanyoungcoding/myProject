const express = require('express');
const router = express.Router();
const Usesr = require('../models/user');

router.get('/register', (req,res) => {
    res.render();
})

module.exports = router;