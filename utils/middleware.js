const isLoggedIn = (req,res,next) => {
  if(!req.isAuthenticated()) {
    req.flash('error', '로그인을 하세요.');
    return res.redirect('/login');
  }
  next();
}

module.exports = isLoggedIn;