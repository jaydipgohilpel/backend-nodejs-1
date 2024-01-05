const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: Number,
  description: String,
  categories: {
    type: Array,
    default: []
  },
  created_at: {
    type: Date,
    default: Date.now()
  }

});

module.exports = mongoose.model('users', userSchema);