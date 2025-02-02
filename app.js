//modules
require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')
const User = require('./models/usermodel')


// declaring passport and sessions

const session = require('express-session')
const _ = require("lodash");
const passport = require('passport')
const LocalStrategy = require('passport-local')



const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const xss = require('xss-clean')

// setting view engine to ejs
app.set('view engine', 'ejs')

//database configure ("monodb/mongoose")
const mongoose = require('mongoose')
const dbname = "codingplatform"
const dburl = "mongodb+srv://avin:avin@cluster0.fhxczjk.mongodb.net/codingplatform?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(dburl,
{useNewUrlParser: true},
{useCreateIndex :true}).then(()=>{
    console.log("connected to database")
})
app.use('/uploads', express.static('uploads'));
//multer
// var fs = require('fs');
// var path = require('path');
// const multer = require('multer')
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//   }
// });
// upload = multer({ storage: storage });


//using middlewares
//app.use(helmet())

app.use(mongoSanitize())
app.use(hpp())
app.use(xss())
app.use(express.static("public"));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
/*



*/


//configuring sessions
app.use(session({
    secret: 'this is my secretenviroment file',
    resave : false,
    saveUninitialized: false ,
    secure : true , 
    httpOnly : true
}))


//using passport middlewares
app.use(passport.initialize());
app.use(passport.session())
const { send, type } = require('express/lib/response');
const { authenticate } = require('passport');
const { result } = require('lodash');
const { buffer } = require('stream/consumers');


// passport.use(new LocalStrategy({usernameField : 'email'},User.authenticate()));
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  console.log(email)
  console.log(password)
  try {
      const user = await User.findOne({ email : email });
      console.log(user)
      if (!user) {
          return done(null, false, { message: 'No user found with this email' });
      }
     

      if (!user.userallowed) {
          return done(null, false, { message: 'Verify your account to log in' });
      }   
      console.log(password)
      const isValidPassword = await user.authenticate(password);
      if (!isValidPassword) {
          return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
  } catch (err) {
   
      return done(err);
  }
}));

//using limiter to limit usages

const limiter = rateLimit({
  max : 100 ,
  windows : 60*60*1000,
  message : "crossed the limit"
})
app.use('/',limiter)

//serializing and deserializing passport


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });



//Routes handler
const home = require('./routes/home')
const dashboard = require('./routes/dashboard');

const authenticateing = require('./routes/authenticate')
const profile = require('./routes/profile')
const userauth = require('./routes/userauth')


app.get('/logout', async (req, res, next) => {
  req.logout((err) => {
    if (err) { 
      return next(err); 
    }
    req.session.destroy(() => {
      res.redirect('/');
    });
  });
});
app.get("/check", async (req,res)=>{
  const user = await User.find();
  console.log(user)
})
//using routes middleware
app.use('/',home )
app.use('/dashboard',dashboard)

app.use('/authenticate',authenticateing)
app.use('/profile',profile)
app.use('/user' , userauth)

/*
*/
app.all('*', async (req,res,next)=>{
  // const user = await User.find();
  // console.log(user)
    res.render('pagenotfound')
    next();
})

//export app.js for server
module.exports = app


