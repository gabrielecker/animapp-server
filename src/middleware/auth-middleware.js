const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../../config');

const TOKENTIME = config.ACCOUNT_TOKEN_TIME_EXPIRATION; //30 days
const SECRET = config.ACCOUNT_SECURITY_TOKEN;

const authenticate = expressJwt({ secret: SECRET });

const generateAccessToken = (req, res, next) =>{
  req.token = req.token || {};
  req.token = jwt.sign({
    id: req.user.id,
  }, SECRET, {
    expiresIn: TOKENTIME
  });
  next();
}

const respond = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    token: req.token
  });
}

module.exports ={
  authenticate,
  generateAccessToken,
  respond
}