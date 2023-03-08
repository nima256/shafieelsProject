module.exports.isLoggedin =  (req ,res , next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error' , 'اول باید وارد بشی')
        return res.redirect('/');
    }
    next();
}