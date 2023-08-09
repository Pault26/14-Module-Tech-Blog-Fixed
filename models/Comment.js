// Import required modules from Sequelize for creating the Comment model.
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize connection instance from '../config/connection'.
const sequelize = require('../config/connections');

// Define the Comment class that extends the Sequelize Model class.
class Comment extends Model {}

// Initialize the Comment model with its attributes and options.
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1] // Validate that comment_text has a minimum length of 1 character.
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user', // References the 'user' model.
            key: 'id' // Refers to the primary key 'id' of the 'user' model.
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'post', // References the 'post' model.
            key: 'id' // Refers to the primary key 'id' of the 'post' model.
        }
    }
}, {
    sequelize, // Connect the model to the Sequelize instance.
    freezeTableName: true, // Don't pluralize the table name.
    underscored: true, // Use underscores instead of camelCase for table and column names.
    modelName: 'Comment' // Set the model name to 'comment'.
});

// Export the Comment model for use in other parts of the application.
module.exports = Comment;
