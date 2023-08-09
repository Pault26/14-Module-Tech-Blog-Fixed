// Import required modules from Sequelize for creating the Post model.
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize connection instance from '../config/connection'.
const sequelize = require('../config/connections');

// Define the Post class that extends the Sequelize Model class.
class Post extends Model {}

// Initialize the Post model with its attributes and options.
Post.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1] // Validate that title has a minimum length of 1 character.
        }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1] // Validate that content has a minimum length of 1 character.
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user', // References the 'user' model.
            key: 'id' // Refers to the primary key 'id' of the 'user' model.
        }
    }
}, {
    sequelize, // Connect the model to the Sequelize instance.
    freezeTableName: true, // Don't pluralize the table name.
    underscored: true, // Use underscores instead of camelCase for table and column names.
    modelName: 'Post' // Set the model name to 'post'.
});

// Export the Post model for use in other parts of the application.
module.exports = Post;
