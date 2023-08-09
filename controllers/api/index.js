// Import the 'express' library and create a router instance.
const router = require('express').Router();

// Import other route modules.
const userRoutes = require('./user-routes.js'); // Import routes related to users
const postRoutes = require('./post-routes.js'); // Import routes related to posts
const commentRoutes = require('./comment-routes.js'); // Import routes related to comments

// Use imported route modules with specific prefixes.
router.use('/users', userRoutes); // Use '/users' prefix for user-related routes
router.use('/posts', postRoutes); // Use '/posts' prefix for post-related routes
router.use('/comments', commentRoutes); // Use '/comments' prefix for comment-related routes

// Export the configured router to be used in other parts of the application.
module.exports = router;
