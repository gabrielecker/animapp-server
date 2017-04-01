const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

//config
const config = require('./config');

//uses
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

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

//routes
const pets = require('./src/routes/pet/pet-route');

app.use('/pets', pets);

app.listen(port);

console.log(`Server listening on port ${ process.env.PORT || port}`);