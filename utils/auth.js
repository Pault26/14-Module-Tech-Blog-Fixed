// Middleware function to check if a user is authenticated (logged in) before granting access to certain routes.
const withAuth = (req, res, next) => {
    // Check if the user is not authenticated (user_id is not in the session).
    if (!req.session.user_id) {
        // Redirect the user to the login page if they are not authenticated.
        res.redirect('/login');
    } else {
        // If the user is authenticated, allow them to proceed to the next middleware or route handler.
        next();
    }
};

// Export the middleware function for use in other parts of the application.
module.exports = withAuth;