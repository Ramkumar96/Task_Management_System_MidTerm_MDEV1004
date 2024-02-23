/*
  Filename: authcontoller.js
  Student’s Name: Ramkumar
  StudentID: 200574709
  Date: 23-02-2024

  This file contains controller functions for handling auth-related operations.
*/
const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../model/user');

// Register a new user
exports.registerUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            req.flash('error', 'Username, password, and email are required');
            return res.redirect('/register');
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            req.flash('error', 'username already exists');
            //return res.redirect('/register');
        }

        const user = new User({ username });
        await User.register(user, password);
        req.flash('success', 'User registration successful');
        res.redirect('/login');
    } catch (error) {
        console.log(error);
        req.flash('error', 'Internal Server Error');
        //res.redirect('/register');
    }
};


// Log in a user
exports.loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Internal Server Error');
            return res.redirect('/login');
        }
        if (!user) {
            console.log(err);
            req.flash('error', 'Invalid credentials');
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.log(err);
                req.flash('error', 'Internal Server Error');
                return res.redirect('/login');
            }
            res.redirect('/homePage');
        });
    })(req, res, next);
};


// Log out a user
exports.logoutUser = (req, res, next) => {
    // Use req.logout with a callback function
    req.logout((err) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Internal Server Error');
            return res.redirect('/login');
        } else {
            req.flash('success', 'You are logged out sucessfully');
            res.redirect('/login');  // Redirect to login page after logout
        }
    }
    )};

    exports.protectedRoute = (req, res) => {
        console.log('Inside protectedRoute');
        console.log('req.isAuthenticated():', req.isAuthenticated());
        console.log('req.user:', req.user);
    
        if (req.isAuthenticated()) {
            res.render('protected', { user: req.user });
        } else {
            console.log('User not authenticated. Redirecting to login.');
            res.redirect('/login');  // Redirect to login if not authenticated
        }
    };
    

module.exports = exports;
