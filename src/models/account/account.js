const mongoose = require('mongoose');
const passPortLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
  email: String,
  password: String
});

Account.plugin(passPortLocalMongoose);

module.exports = mongoose.model('Account', Account);