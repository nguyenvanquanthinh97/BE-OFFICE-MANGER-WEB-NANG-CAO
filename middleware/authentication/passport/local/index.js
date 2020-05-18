const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../../../../api/user/model');


const LocalStrategy = new Strategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOneByEmail(email);
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!await bcrypt.compare(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

module.exports = LocalStrategy;