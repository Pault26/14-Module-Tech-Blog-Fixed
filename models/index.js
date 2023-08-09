// Import the User, Post, and Comment models from their respective files.
const User = require('./User'); // Import User model
const Post = require('./Post'); // Import Post model
const Comment = require('./Comment'); // Import Comment model

// Define associations between the models using Sequelize associations.
// Define a one-to-many relationship: User has many Posts.
User.hasMany(Post, {
    foreignKey: 'user_id' // Connects the user_id field in the User model to the foreign key in the Post model.
});

// Define a one-to-many relationship: User has many Comments.
User.hasMany(Comment, {
    foreignKey: 'user_id' // Connects the user_id field in the User model to the foreign key in the Comment model.
});

// Define a many-to-one relationship: Post belongs to a User.
Post.belongsTo(User, {
    foreignKey: 'user_id' // Connects the user_id field in the Post model to the primary key in the User model.
});

// Define a one-to-many relationship: Post has many Comments.
Post.hasMany(Comment, {
    foreignKey: 'post_id' // Connects the post_id field in the Post model to the foreign key in the Comment model.
});

// Define a many-to-one relationship: Comment belongs to a User.
Comment.belongsTo(User, {
    foreignKey: 'user_id' // Connects the user_id field in the Comment model to the primary key in the User model.
});

// Define a many-to-one relationship: Comment belongs to a Post.
Comment.belongsTo(Post, {
    foreignKey: 'post_id' // Connects the post_id field in the Comment model to the primary key in the Post model.
});

// Export the User, Post, and Comment models with their associations.
module.exports = {
    User,
    Post,
    Comment
};