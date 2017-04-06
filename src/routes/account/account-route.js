const express = require('express');
const passport = require('passport');
const router = express.Router();
const Account = require('../../models/account/account');
const authMiddleWare = require('../../middleware/auth-middleware');

const { generateAccessToken, respond, authenticate} = authMiddleWare;

router.post('/register',  (req, res) =>{
  Account.register(new Account({
    username: req.body.email}), req.body.password, (err, account) =>{
    if(err){
      res.send({message: err});
    }

    passport.authenticate(
      'local', {
        session: false
      })(req, res, ()=>{
      res.status(200).json({message:'Successfully created new account'});
    });
  });
});

router.post('/login', passport.authenticate(
  'local', {
    session: false,
    scope: []
  }), generateAccessToken, respond);



router.get('/logout', authenticate, (req, res)=>{
  res.logout();
  res.status(200).json({message: 'Successfully logged out'});
});

router.get('/me', authenticate, (req, res) =>{
  res.status(200).json(req.user);
});

module.exports = router;