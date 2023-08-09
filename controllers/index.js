// Import the 'express' library and create a router instance.
const router = require('express').Router();

// Import routes from separate files.
const apiRoutes = require('./api'); // Import API-related routes
const homeRoutes = require('./home-routes.js'); // Import routes for the home page
const dashboardRoutes = require('./dashboard-routes.js'); // Import routes for the dashboard

// Use the imported routes with specific prefixes.
router.use('/api', apiRoutes); // Use '/api' prefix for API-related routes
router.use('/dashboard', dashboardRoutes); // Use '/dashboard' prefix for dashboard routes
router.use('/', homeRoutes); // Use root path for home page routes

// If no route matches, send a 404 (Not Found) status response.
router.use((req, res) => {
    res.status(404).end();
});

// Export the configured router to be used in other parts of the application.
module.exports = router;