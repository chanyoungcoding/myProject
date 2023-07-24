const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const user = require('../controllers/users')

router.get('/register', user.registerUser);

router.get('/login', user.loginUser)

router.get('/logout', user.logoutUser);

router.post('/register', catchAsync(user.userRegister))

router.post(
  '/login',
  passport.authenticate(
    'local',
    {failureFlash: true, failureRedirect: '/login'}
  ),
  user.userLogin
)

module.exports = router;