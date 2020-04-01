const createError = require('http-errors');
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const passport = require('passport');
const morgan = require('morgan');
const config = require('./config');
const restful = require('node-restful');
const authenticate = require('./authenticate');

const authRouter = require('./routes/authRouter');
const orderRouter = require('./routes/orderRouter');
/*  Swapping out routers for node-restful
const customerRouter = require('./routes/customerRouter');
const inventoryRouter = require('./routes/inventoryRouter');
const productRouter = require('./routes/productRouter');
const scheduleRouter = require('./routes/scheduleRouter');
*/

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
    user.name="Admin User";
    user.role="Admin";
    setPass(user, adminPwd);
  } else {
  User.register(new User({username: "admin", name: "Admin User", role: "Admin" }), adminPwd)
  .then(pwd => { console.log("Admin Register: ",adminPwd); })
  }
});


const app = express();

// Secure traffic only
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
      console.log(`Redirecting to: https://${req.hostname}:${app.get('secPort')}${req.url}`);
      res.redirect(301, `https://${req.hostname}:${app.get('secPort')}${req.url}`);
  }
});

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
/*  Swapping out routers for node-restful
app.use('/api/customers', customerRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/products', productRouter);
app.use('/api/schedules', scheduleRouter);
*/

app.use('/api/orders', orderRouter);

const customerModel = require('./models/customer');
const Customer = app.resource = restful.model('Customer', customerModel.customerSchema).methods(['get','post','put','delete']);
Customer.before('get', authenticate.verifyUser).before('post', authenticate.verifyUser).before('put', authenticate.verifyUser).before('delete', authenticate.verifyUser);
Customer.register(app, '/api/customers');

const inventoryModel = require('./models/inventory');
const Inventory = app.resource = restful.model('Inventory', inventoryModel.inventorySchema).methods(['get','post','put','delete']);
Inventory.before('get', authenticate.verifyUser).before('post', authenticate.verifyUser).before('put', authenticate.verifyUser).before('delete', authenticate.verifyUser);
Inventory.register(app, '/api/inventory');

const productModel = require('./models/product');
const Product = app.resource = restful.model('Product', productModel.productSchema).methods(['get','post','put','delete']);
Product.before('get', authenticate.verifyUser).before('post', authenticate.verifyUser).before('put', authenticate.verifyUser).before('delete', authenticate.verifyUser);
Product.register(app, '/api/products');

const scheduleModel = require('./models/schedule');
const Schedule = app.resource = restful.model('Schedule', scheduleModel.scheduleSchema).methods(['get','post','put','delete']);
Schedule.before('get', authenticate.verifyUser).before('post', authenticate.verifyUser).before('put', authenticate.verifyUser).before('delete', authenticate.verifyUser);
Schedule.register(app, '/api/schedules');

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
