const express = require('express');
const router = express.Router();
const wrapAsync = require('../util/wrapAsync');
const passport = require('passport');
const flash = require('connect-flash');
const { originalUrl } = require('../middleware.js');
const userController = require('../controllers/user');



router.route('/signUp')
.get( wrapAsync(userController.signUpForm))
.post(wrapAsync(userController.signUp));


router.route('/login')
.get(wrapAsync(userController.loginForm))
.post(
    originalUrl,
    passport.authenticate('local',
     { failureRedirect: '/login' ,failureFlash : "Invalid username or password"}),
    wrapAsync( userController.login)
    );


router.get('/logout',wrapAsync(userController.logout));
module.exports = router;