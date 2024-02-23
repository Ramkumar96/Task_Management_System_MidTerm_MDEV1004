/*
  Filename: node.js
  Student’s Name: Ramkumar
  StudentID: 200574709
  Date: 23-02-2024
*/  

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./src/routes/routes');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const bodyParser=require('body-parser');
const User = require('./src/model/user');

const app = express();
app.use(flash());
// Add this middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Generate a random 32-byte (256-bit) key
const secretKey = crypto.randomBytes(32).toString('hex');

// Use express session
app.use(session({
    secret: secretKey,
    resave: true,
    saveUninitialized: true
}));

// Set the view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Configure Passport to use a LocalStrategy with Mongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

dotenv.config({ path: './config.env' });

// Use CORS middleware before defining any routes
app.use(cors({
    origin: 'http://localhost:8081',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Initialize MongoDB Connection
mongoose.connect(process.env.MONGODB_URL).then(() => {
    importData();
});

// Read the data from movies.json
const data = JSON.parse(fs.readFileSync('./tasks.json', 'utf-8'));

// Import data to MongoDB if the collection is empty
const importData = async () => {
    try {
        const Movie = require('./src/model/tasks');
        const count = await Movie.countDocuments();
        if (count === 0) {
            await Movie.create(data);
            console.log('Data successfully imported to MongoDB');
        } else {
            console.log('Data already exists in the database');
        }
    } catch (e) {
        console.log("Error importing the data", e);
    }
};

// Middleware setup
app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send("Welcome to Task Management System app");
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register', { error: req.flash('error') });
});

app.get('/homePage', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('index', { user: req.user });
    } else {
        res.redirect('/login');
    }
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/protected',
    failureRedirect: '/login',
    failureFlash: true
}));

const authRoutes = require('./src/routes/routes');
app.use('/auth', authRoutes);
app.use('/task', taskRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is listening to port no ${port}`);
});