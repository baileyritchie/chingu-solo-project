var dotenv = require('dotenv');
var jwt = require ('jsonwebtoken');
const { render } = require('../app');

//middleware to check if token exists and if it does passes along user data

module.exports = {
  isAuthenticated: function(req,res,next) {
    const token =
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;
    if (!token) {
      res.status(401).send('Unauthorized: No token provided 1');
    } else {
      jwt.verify(token,process.env.JWT_SECRET, function (err,unhashed){
        if (err) {
          console.log(err,'error');
          res.status(401).send('Unauthorized: No token provided. 2')
        } else {
          req.name = unhashed.name;
          req.email = unhashed.email;
          next();
        }
      });
    }
  },
  getUserData: function (req,res,next) {
    const token =
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;
    if (!token) {
      res.status(401).send('Unauthorized: No token provided');
    } else {
      jwt.verify(token,process.env.JWT_SECRET, function (err,unhashed){
        if (err) {
          console.log(err,'error');
          res.status(401).send('Unauthorized: No token provided.')
        } else {
          req.name = unhashed.name;
          req.email = unhashed.email;
          next();
        }
      });
    }

  }
}

