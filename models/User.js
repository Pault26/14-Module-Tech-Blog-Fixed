// Import required modules from Sequelize for creating the User model.
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize connection instance from '../config/connection'.
const sequelize = require('../config/connections');

// Import the 'bcrypt' library for password hashing.
const bcrypt = require('bcrypt');

// Define the User class that extends the Sequelize Model class.
class User extends Model {
    // Method to check if a provided password matches the hashed password.
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// Initialize the User model with its attributes and options.
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4] // Validate that password has a minimum length of 4 characters.
        }
    }
}, {
    hooks: {
        // Hook executed before creating a new user to hash the password.
        async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        // Hook executed before updating a user to hash the password.
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    sequelize, // Connect the model to the Sequelize instance.
    timestamps: false, // Disable automatic timestamps (createdAt, updatedAt).
    freezeTableName: true, // Don't pluralize the table name.
    underscored: true, // Use underscores instead of camelCase for table and column names.
    modelName: 'User' // Set the model name to 'user'.
});

// Export the User model for use in other parts of the application.
module.exports = User;