const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');

router.get('/register', (req,res) => {
    res.render('users/register');
})

router.get('/login', (req,res) => {
    res.render('users/login');
})

router.post('/register', catchAsync(async(req,res) => {
    try{
        const {username, email, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.flash('success', 'register success')
        res.redirect('/campgrounds')
    } catch(e) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}))

router.post('/login',passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req,res) => {
    req.flash("success", "made it");
    res.redirect('/campgrounds')
})

module.exports = router;