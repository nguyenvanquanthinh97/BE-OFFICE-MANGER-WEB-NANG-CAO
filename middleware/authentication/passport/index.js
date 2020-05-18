const passport = require('passport');

const localPassport = require('./local');
const jwtPassport = require('./jwt');

passport.use(localPassport);
passport.use(jwtPassport);

module.exports = passport;