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

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
});

router.post('/register', catchAsync(async(req,res) => {
    try{
        const {username, email, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err)
            req.flash('success', 'register success')
            res.redirect('/campgrounds')  
        })
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