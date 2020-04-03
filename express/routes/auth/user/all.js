const express = require('express');
const User = require('../../../models/user');
const passport = require('passport');
const authenticate = require('../../../authenticate');

const router = express.Router();

router.get('/', authenticate.verifyUser, (req, res) => {
  res.setatusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ username: req.user.username, name: req.user.name });
})

module.exports = router;