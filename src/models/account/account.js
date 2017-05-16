const mongoose = require('mongoose');
const passPortLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
  email: String,
  password: String,
  name: String,
  lastName: String,
  facebookProfile: String,
  cellPhone: String,
});

Account.plugin(passPortLocalMongoose,{
  selectFields: 'name lastName facebookProfile cellPhone',
  errorMessages:{
    MissingPasswordError: 'Por favor informe sua senha!',
    AttemptTooSoonError: 'Sua conta está bloqueada, tente mais tarde!',
    TooManyAttemptsError: 'Sua conta foi bloqueada devido a diversas tentativas de login!',
    IncorrectPasswordError: 'Senha incorreta!',
    IncorrectUsernameError: 'Usuário não existe!',
    MissingUsernameError: 'Este usuário já existe!',
  },
});

module.exports = mongoose.model('Account', Account);