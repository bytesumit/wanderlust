require('dotenv').config();
const express = require('express');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const listingRouter = require('./routers/listingsRouter.js');
const reviewRouter = require('./routers/reviewsRouter.js');
const userRouter = require('./routers/usersRouter.js');
const ExpressError =   require('./util/ExpressError.js');
const User = require('./models/User.js');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;
const path = require('path');
const methodOverride = require('method-override');
app.use(express.urlencoded({extended:true}));
app.set('views',path.join(__dirname,'/views')); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.engine('ejs',ejsMate);
app.set('view engine' ,'ejs');
app.use(methodOverride('_method'));

// const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Mongo_URL = process.env.ATLAS_DB_URL;
async function main() {
    await mongoose.connect(Mongo_URL);
}
main().then((res)=>{
    console.log('connected to db');
}).catch((err)=>{
    console.log(err);
});

// Mongo Store Object
const store = MongoStore.create({
    mongoUrl : Mongo_URL,
    touchAfter : 24 * 60 * 60,
    crypto : {
        secret : process.env.CRYPTO_SECRET,
    }
});


// express Session Object
const sessionOption ={
    store,
    secret : process.env.CRYPTO_SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        originalMaxAge :  7 * 24 * 60 * 60 * 1000,
        httpOnly: true

    }
};

// app.get('/',(req,res)=>{
//     res.send("<a href='/listing'> alllistying </a>");
//     console.log(req.session.cookie.path);
// });

// Middlewares
app.use(session(sessionOption));
app.use(flash());

// passport Middlewear
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// storing locals values from flash
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

// route middlewear
app.use('/listing',listingRouter);
app.use('/listing/:id/reviews',reviewRouter);
app.use('/',userRouter);

// Error handler route
app.get('*', (req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

// Error Showing Middleware
app.use((err,req,res,next)=>{
   let {status=500,message}= err;
  res.status(status).render('./listings/error.ejs',{message})
});

// Start Server on port 
app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
});
