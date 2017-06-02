const jwt = require('jwt-simple');
const Account = require('../models/account/account');
const config = require('../../config');

function tokenForAccount(account){
  const iat = new Date().getTime();
  const sub = account.id;
  return jwt.encode(
    {
      sub,
      iat,
    }, config.ACCOUNT_SECURITY_TOKEN);
}

function signIn(req, res, next){
  const {email} = req.body;
  Account.findOne({email}, (err, account)=>{
    const {email, name, lastName, facebookProfile, cellPhone} = account;
    res.send({
      token: tokenForAccount(account),
      email,
      name,
      lastName,
      facebookProfile,
      cellPhone
    });
  })
}

function signUp(req, res, next){
  const {
    name,
    lastName,
    email,
    password,
    facebookProfile,
    cellPhone
  } = req.body;

  if(!email || !password){
    return res.status(422).send({error: 'You must provide email and password'});
  }

  Account.findOne({email}, (err, existingAccount)=>{
    if(err){
      return next(err);
    }

    if(existingAccount) {
      return res.status(422).send({error: 'Account is in use'});
    }

    const account = new Account({
      name,
      lastName,
      email,
      password,
      facebookProfile,
      cellPhone
    });

    account.save(err=>{
      if(err){
        return next(err);
      }

      res.json({token: tokenForAccount(account)});
    });
  });
}

module.exports = {
  signIn,
  signUp
}