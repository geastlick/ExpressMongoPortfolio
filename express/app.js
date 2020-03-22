const createError = require('http-errors');
const express = require('express');
const path = require('path');
const passport = require('passport');
const logger = require('morgan');
const config = require('./config');

const authRouter = require('./routes/authRouter');
const customerRouter = require('./routes/customerRouter');
const inventoryRouter = require('./routes/inventoryRouter');
const orderRouter = require('./routes/orderRouter');
const productRouter = require('./routes/productRouter');
const scheduleRouter = require('./routes/scheduleRouter');

const mongoose = require('mongoose');
const url = config.mongoUrl;
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
connect.then(() => console.log('Connected correctly to server'), 
    err => console.log(err)
);

const pwdGen = require('generate-password');
const adminPwd = pwdGen.generate({
  length: Math.round(Math.random()*40+10),
  numbers: true,
  symbols: false,
  lowercase: true,
  uppercase: true,
  strict: true
});

async function setPass(user, adminPwd) {
  try {
    await user.setPassword(adminPwd);
    await user.save();
    console.log("Admin Set:", adminPwd);
  }
  catch (err) {
    console.log("Error setting admin password", err);
  }
}

// Only temporary - will be removed once I am able to manually create users in db
const User = require('./models/user');
User.findByUsername("admin")
.then(user => { 
  if(user) {
   setPass(user, adminPwd);
  } else {
  User.register(new User({username: "admin", name: "Admin User"}), adminPwd)
  .then(pwd => { console.log("Admin Register: ",adminPwd); })
  }
});


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/api/customers', customerRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);
app.use('/api/schedules', scheduleRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.setHeader('Content-Type', 'application/json');
  res.json({error: req.app.get('env') === 'development' ? err : {}});
});

module.exports = app;
