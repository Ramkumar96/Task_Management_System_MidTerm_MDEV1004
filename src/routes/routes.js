const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../model/user');
const Task = require('../model/tasks'); 

const taskController = require('../controllers/controller.js');
const middleware = require('../middleware/middleware.js');
const authController = require('../controllers/authcontroller.js');

// Register a new user
router.post('/register', authController.registerUser);

// Log in a user
router.post('/login', authController.loginUser);

// Log out a user
router.get('/logout', authController.logoutUser);

// Example protected route that requires authentication
router.post('/protected', middleware.isAuthenticated, authController.protectedRoute);

router.get('/tasks', middleware.logReadRequest, taskController.getAllTasks);
router.get('/users', middleware.logReadUsersRequest, taskController.getAllUsers);
router.get('/tasks/status/:status', middleware.logReadTasksByGroupRequest, taskController.getTasksByStatus);
router.get('/task/:id', middleware.logReadTaskByIdRequest, taskController.getTasksByTaskId);
router.get('/user/:username', middleware.logReadUserByUserNameRequest, taskController.getUserByUsername);


module.exports = router;
