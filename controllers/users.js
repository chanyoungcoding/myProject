const User = require('../models/user');

const registerUser = (req,res) => {
  res.render('users/register');
}

const loginUser = (req,res) => {
  res.render('users/login');
}

const logoutUser = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
        return next(err);
    }
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds/home');
  });
}

const userRegister = async(req,res) => {
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
}

const userLogin = (req,res) => {
  req.flash("success", "made it");
  res.redirect('/campgrounds/home')
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  userRegister,
  userLogin
}