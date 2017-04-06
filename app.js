const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy =  require('passport-local').Strategy;
const app = express();

//models
const Account = require('./src/models/account/account');

//config
const config = require('./config');

//uses
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//mongoose
mongoose.connect(config.MONGO_URL);
mongoose.connection
  .once('open', ()=>{
    console.log('Connected with mongoose!');
  })
  .on('error', err=> console.log('Mongoose error: ', err));

const router = express.Router();

app.use((req, res, next)=>{
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  console.log(`A new ${req.method} request was made!`);
  next();
});

//passport config
app.use(passport.initialize());
passport.use(new LocalStrategy({
    userNameField: 'email',
    passwordField: 'password'
  },
  Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


//routes
const pets = require('./src/routes/pet/pet-route');
app.use('/pets', pets);
const accounts = require('./src/routes/account/account-route');
app.use('/accounts', accounts);

const port = process.env.PORT || 3000;

app.listen(port);

console.log(`Server listening on port ${port}`);