// user authentication routes
var express = require('express');
var router = express.Router();
var jwt = require ('jsonwebtoken');
var User = require('../models/User');
var auth = require('../middleware/auth');

/* POST to register/sign up users*/
router.post('/signup', (req,res) => {
  let newUser = new User();
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.password = req.body.password; //password will be hashed before save

  newUser.save(function(err,saved) {
    try {
      if (err) {
        console.log(err);
        throw err.errmsg
      };
      res.status(200).json({
        success:true,
        message: "Succesfully registered."
      });
    }
    catch(e) {
      res.status(500).json({
        success: false,
        message: "Error. Insure correct outputs or contact administrator."
      });
    }
  });

});

/* POST user/ log in */
router.post('/login',(req,res) => {
  User.findOne({
    email: req.body.email
  }, (error,user) => {
    if (error) {
      res.status(500).json({
        success:false,
        message: "Something wrong with system. Contact system administrator.",
        system_error: error
      });
    } 
    if (user) {
      // utilize mongoose schema comparison method
      user.comparePassword(req.body.password, (err,isMatch) => {
        if (err) throw err;
        if (isMatch) {
          var token = jwt.sign({
            name: user.name,
            email: user.email
          }, process.env.JWT_SECRET, 
          { expiresIn: '1h' }
          );
          res.cookie('token', token).sendStatus(200);
        } else {
          res.status(401).json({
            success:false,
            message: "Invalid username or password.",
            result: {}
          })
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: "User not found.",
        result: {}
      })
    }
  });
});
/* GET the current users token*/
router.get('/verify',auth.isAuthenticated,(req,res) => {
  res.sendStatus(200);
});







module.exports = router;




