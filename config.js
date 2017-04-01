const MONGO_USER = 'test';
const MONGO_PASS = 'test';
const MONGO_SERVER = 'ds119728.mlab.com:19728/heroku_gxnl2pkx';

const MONGO_URL = `mongodb://${MONGO_USER && MONGO_PASS ? `${MONGO_USER}:${MONGO_PASS}@` : ''}${MONGO_SERVER}`;
const SERVER_PORT = 3000;

module.exports = {
  SERVER_PORT,
  MONGO_URL
}