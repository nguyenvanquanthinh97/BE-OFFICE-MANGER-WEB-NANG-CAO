const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { get } = require('lodash');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

const JwtStrategy = new Strategy(opts, (jwt_payload, done) => {
  const user = {
    companyId: get(jwt_payload, 'companyId'),
    userId: get(jwt_payload, 'userId'),
    role: get(jwt_payload, 'role'),
    username: get(jwt_payload, 'username')
  };
  return done(null, user);
});

module.exports = JwtStrategy;