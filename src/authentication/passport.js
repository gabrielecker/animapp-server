const passport = require('passport');
const Account = require('../models/account/account');
const config = require('../../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, (email, password, done)=>{

  Account.findOne({email}, (err, account)=>{
    if(err){
      return done(err);
    };
    if(!account){
      return done(null, false);
    };

    account.comparePassword(password, (err, isMatch)=>{
      if(err){
        return done(err);
      };
      if(!isMatch){
        return done(null, false);
      };

      return done(null, account);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.ACCOUNT_SECURITY_TOKEN
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done)=>{
  Account.findById(payload.sub, (err, account)=>{
    if(err){
      return done(err, false);
    }

    if(account){
      done(null, account);
    }else{
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);