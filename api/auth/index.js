const express = require('express');
const router = express.Router();

const controller = require('./controller');
const passport = require('passport');

router.post('/signup', controller.signup);
router.post('/login', passport.authenticate('local', { session: false }), controller.login);

module.exports = router;