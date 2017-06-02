const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const AccountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  lastName: String,
  facebookProfile: String,
  cellPhone: String,
});

AccountSchema.pre('save', function(next){
  const account = this;
  bcrypt.genSalt(10, (err, salt)=>{
    if(err){
      return next(err);
    };

    bcrypt.hash(account.password, salt, null, (err, hash)=>{
      if(err){
        return next(err);
      };
      account.password = hash;
      next();
    });
  });
});

AccountSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}

module.exports = mongoose.model('Account', AccountSchema);