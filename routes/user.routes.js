var express = require('express');
var router = express.Router();
var User = require('../models/user.model');

// get all the users
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

// get a single user by id
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// user login api 
router.post('/login', (req, res) => {
  if(req.body.email == "") {
    return res.send({
      message: "Email cannot be blank"
    });
  }
  else if(req.body.password == "") {
    return res.send({
      message: "Password cannot be blank"
    });
  }
  else {
    // find user with requested email 
    User.findOne({ email : req.body.email }, function(err, user) { 
      if (user === null) { 
        return res.send({ 
          message : "User not found. Please register as a new user"
        }); 
      } 
      else if (user.validPassword(req.body.password)) { 
        // simply check (user.password === req.body.password)
        return res.json(user); 
      } 
      else { 
        return res.send({
          message : "Incorrect Password"
        }); 
      } 
    });
  } 
}); 
validate = (user) => {
  if (!user.first_name) {
    user.fnameError = "First Name cannot be blank";
  }
  if (!user.last_name) {
    user.lnameError = "Last Name cannot be blank";
  }
  if (!user.email.includes("@") && !user.email.includes(".")) {
    user.emailError = "Invalid Email";
  }
  if(user.password.length < 8) {
      user.passwordLengthError = "Password should contain atleast 8 characters"
  }
  if(!(user.password === user.cnfpassword)) {
      user.passwordMatchError = "Passwords do not match"
  }
  if(!user.age || user.age < 0 || user.age > 120) {
    user.ageError = "Invalid Age"
  }
  return user;
};
// user signup api 
router.post('/signup', (req, res, next) => { 
   
  // creating empty user object 
  let newUser = new User(); 

  // initialize newUser object with request data
  newUser.first_name = req.body.first_name,
  newUser.last_name = req.body.last_name,
  newUser.email = req.body.email,
  newUser.age = req.body.age

  req.body.fnameError = "";
  req.body.lnameError = "";
  req.body.emailError = "";
  req.body.ageError = "";
  req.body.passwordLengthError = "";
  req.body.passwordMatchError = "";
  
  // call setPassword function to hash password 
  newUser.setPassword(req.body.password); 

  // save newUser object to database if validated successfully
  const user = validate(req.body);
  if(!(user.fnameError || user.lnameError || user.emailError || user.ageError || user.passwordLengthError || user.passwordMatchError)) {
    User.create(newUser ,function(err, post) { 
      if (err) return next(err); 
      res.json(post);
    });
  } else {
    res.status(201).json(user);
  }
}); 

module.exports = router;