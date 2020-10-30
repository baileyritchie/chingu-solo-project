// data model for the user 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  email : {
    type: String,
    required:true,
    unique: true
  },
  password : {
    type: String,
    required: true
  },
  currentQuestion: {
    type: Number,
    default: 1
  },
  currentScore : {
    type: Number,
    default: 0
  }
});

userSchema.pre('save', function(next) {
  let user = this;
  bcrypt.genSalt(10, function (err,salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err,hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (input,callback) {
  bcrypt.compare(input,this.password,function (err,isMatch) {
    if (err) return callback(err);
    callback(null,isMatch);
  });
};

module.exports = mongoose.model('user',userSchema);
