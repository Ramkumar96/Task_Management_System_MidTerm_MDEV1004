  const logReadRequest = (req, res, next) => {
    console.log('Fetching all available tasks');
    next();
  };

  const logReadUsersRequest = (req, res, next) => {
    console.log('Fetching all available users');
    next();
  };

  const logReadTasksByGroupRequest = (req, res, next) => {
    console.log(`Fetching all the tasks with task status: ${req.params.status}`);
    next();
  };

  const logReadTaskByIdRequest = (req, res, next) => {
    console.log(req.params.taskId);
    console.log(`Fetching the Details of tasks with task Id: ${req.params.taskId}`);
    next();
  };

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



