// Import the 'express' library and create a router instance.
const router = require('express').Router();

// Import necessary models for the routes: User, Post, and Comment.
const { User, Post, Comment } = require('../../models');

// Import the 'withAuth' middleware for authentication.
const withAuth = require('../../utils/auth');

// Route to get all comments.
router.get("/", (req, res) => {
    Comment.findAll()
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Route to create a new comment with authentication.
router.post('/', withAuth, (req, res) => {
    // Check if the user session exists.
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

// Export the configured router to be used in other parts of the application.
module.exports = router;