const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const Worker = require('../models/workers')

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({'email': email})
  console.log(user)
  if(user) {
    return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
  } else {
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
  console.log(newUser)
    await newUser.save();
    done(null, newUser);
  }
}));


passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({'email': email});
  if(!user) {
    return done(null, false, req.flash('signinMessage', 'No User Found'));
  }
  if(!user.comparePassword(password)) {
    return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
  }
  return done(null, user);
}));


passport.use('local-worker', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  useremailField: 'email',
  bloodtypeField: 'bloodtype',
  ageField: 'age',
  weightField: 'weight',
  heightField: 'height',
  statField: 'stat',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const worker = await Worker.findOne({'email': email})
  console.log(worker)
  if(worker) {
    return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
  } else {
    const newWorker = new Worker();
    newWorker.username = req.body.username;
    newWorker.email = req.body.email;
    newWorker.password = newWorker.encryptPassword(password);
    newWorker.bloodtype = req.body.bloodtype;
    newWorker.age = req.body.age;
    newWorker.weight = req.body.weight;
    newWorker.height = req.body.height;
    newWorker.stat = req.body.status;

  console.log(newWorker)
    await newWorker.save();
    done(null, newWorker);
  }
}));