// data model for the user 
const mongoose = require('mongoose');

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
  }
});

let User = mongoose.model('user',userSchema);

module.exports = User;
