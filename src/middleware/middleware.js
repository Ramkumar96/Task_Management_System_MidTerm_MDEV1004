/*
  Filename: middleware.js
  Student’s Name: Ramkumar
  StudentID: 200574709
  Date: 23-02-2024

  This file contains middleware functions for handling tasks related operations.
*/  
  
// Middleware to log read request for all available tasks
  const logReadRequest = (req, res, next) => {
    console.log('Fetching all available tasks');
    next();
  };

  // Middleware to log read request for all available users
  const logReadUsersRequest = (req, res, next) => {
    console.log('Fetching all available users');
    next();
  };


// Middleware to log read request for tasks by group
  const logReadTasksByGroupRequest = (req, res, next) => {
    console.log(`Fetching all the tasks with task status: ${req.params.status}`);
    next();
  };

  // Middleware to log read request for a specific task by ID
  const logReadTaskByIdRequest = (req, res, next) => {
    console.log(req.params.taskId);
    console.log(`Fetching the Details of tasks with task Id: ${req.params.taskId}`);
    next();
  };

  // Middleware to log read request for a user by username
  const logReadUserByUserNameRequest = (req, res, next) => {
    console.log(`Fetching Detailed Profile Information about a User with User name: ${req.params.username}`);
    next();
  };

    // Middleware to check if the user is authenticated
    const isAuthenticated = (req, res, next) => {
      if (req.isAuthenticated()) {
          return next();
      } else {
          res.status(401).json({ error: 'Unauthorized' });
      }
    };
  
  module.exports = {
    logReadRequest,
    logReadUsersRequest,
    logReadTasksByGroupRequest,
    logReadTaskByIdRequest,
    logReadUserByUserNameRequest,
    isAuthenticated
  };



