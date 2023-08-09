// Import necessary modules and libraries.
const path = require('path');
const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connections');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Configure the session settings.
const sess = {
    secret: process.env.DB_SECRET, // Secret used to sign the session ID cookie.
    cookie: {}, // Configurations for the cookie.
    resave: false, // Avoid session resave if no changes are made.
    saveUninitialized: true, // Save uninitialized sessions.
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1000 * 60 * 10, // Check every 10 minutes for expired sessions.
        expiration: 1000 * 60 * 30 // Expire sessions after 30 minutes of inactivity.
    })
};

// Create an Express application.
const app = express();

// Set the port for the application.
const PORT = process.env.PORT || 3006;

// Configure the view engine to use Handlebars.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Configure middleware.
app.use(session(sess)); // Use session middleware.
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files.
app.use(express.json()); // Parse JSON request bodies.
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies.
app.use(routes); // Use defined routes.

// Synchronize Sequelize models with the database.
sequelize.sync();

// Start the Express application and listen on the specified port.
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});