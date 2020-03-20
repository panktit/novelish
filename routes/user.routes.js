var express = require('express');
var router = express.Router();
var User = require('../models/user.model');
var cookieParser = require('cookie-parser');
router.use(cookieParser());

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

// user signup api 
router.post('/signup', (req, res, next) => { 
   
// creating empty user object 
  let newUser = new User(); 

  // initialize newUser object with request data
  newUser.first_name = req.body.first_name,
  newUser.last_name = req.body.last_name,
  newUser.email = req.body.email,
  newUser.age = req.body.age
  

  // call setPassword function to hash password 
  newUser.setPassword(req.body.password); 

  // save newUser object to database 
  User.create(newUser ,function(err, post) { 
    if (err) return next(err); 
    res.json(post);
  }); 
}); 


router.get('/setcookie', function(req, res){
  // setting cookies
  res.cookie('about', 'Novelish: Online book uploading website', { maxAge: 10000, httpOnly: true });
  return res.send('Cookie has been set');
});

router.get('/getcookie', function(req, res) {
  var about = req.cookies['about'];
  if (about) {
    return res.send(about);        
  }   
  return res.send('No cookie found');
});

module.exports = router;