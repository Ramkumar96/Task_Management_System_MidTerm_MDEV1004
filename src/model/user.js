/*
  Filename: user.js
  Student’s Name: Ramkumar
  StudentID: 200574709
  Date: 23-02-2024
*/  

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String
    
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;
