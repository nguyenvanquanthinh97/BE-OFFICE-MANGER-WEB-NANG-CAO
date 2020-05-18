const express = require('express');
const router = express.Router();
const passport = require('passport');

const controller = require('./controller');

router.get('/:userId', passport.authenticate('jwt', { session: false }), controller.getInfo);

module.exports = router;