const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');

// Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  console.log(`A new ${req.method} request was made!`);
  next();
});


//routes
const pets = require('./src/routes/pet/pet-route');
app.use('/pets', pets);
const accounts = require('./src/routes/account/account-route');
app.use('/accounts', accounts);

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log('================');
    console.log('MESSAGE:')
    console.log(err.message);
    console.log('ERROR:')
    console.log(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Server listening on port ${port}`);