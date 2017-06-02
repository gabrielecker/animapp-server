const express = require('express');
const router = express.Router();
const Account = require('../../models/account/account');
const Authentication = require('../../authentication/authentication');
const passportService = require('../../authentication/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});

router.post('/register', Authentication.signUp);
router.post('/login', requireSignIn, Authentication.signIn);

module.exports = router;