const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const user = require('../controllers/users')

router.route('/register')
  .get(user.registerUser)
  .post(catchAsync(user.userRegister))

router.route('/login')
  .get(user.loginUser)
  .post(passport.authenticate('local',{failureFlash: true, failureRedirect: '/login'}), user.userLogin)

router.get('/logout', user.logoutUser);

module.exports = router;