// Import the Sequelize library, which provides an ORM (Object-Relational Mapping) for interacting with databases.
const Sequelize = require('sequelize');

// Import the 'dotenv' library to load environment variables from a .env file.
require('dotenv').config();

// Declare a variable to hold the Sequelize instance.
let sequelize;

// Check if a JAWSDB_URL environment variable is present (often used in cloud deployment, like Heroku, for database connections).
if (process.env.JAWSDB_URL) {
    // If JAWSDB_URL exists, create a Sequelize instance using the provided URL for the database connection.
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // If JAWSDB_URL does not exist, create a Sequelize instance using the provided environment variables for database configuration.
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',       // Database host
        dialect: 'mysql',        // Database dialect (MySQL in this case)
        port: 3306              // Port for the database connection
    });
}

// Export the configured Sequelize instance to be used in other parts of the application.
module.exports = sequelize;
