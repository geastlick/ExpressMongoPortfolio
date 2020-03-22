const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const authenticate = require('../authenticate');

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
    const token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, access_token: token, user: { username: req.user.username, name: req.user.name } } );
});

router.get('/user', authenticate.verifyUser, (req, res) => {
  res.setatusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ username: req.user.username, name: req.user.name });
})

module.exports = router;