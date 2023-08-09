// Import the 'express' library and create a router instance.
const router = require('express').Router();

// Import the Sequelize connection instance from the '../config/connection' path.
const sequelize = require('../config/connections');

// Import necessary models and authentication middleware for the routes: Post, User, Comment, and withAuth.
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to fetch and render all posts associated with the logged-in user.
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id // Filter by the logged-in user's ID
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        // Map the fetched post data into plain objects.
        const posts = dbPostData.map(post => post.get({ plain: true }));

        // Render the 'dashboard' template with user's posts and login status.
        res.render('dashboard', {
            posts,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Route to fetch and render a single post for editing.
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'title', 'content', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            // If the post doesn't exist, return a 404 JSON response.
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        // Render the 'edit-post' template with the fetched post and login status.
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', {
            post,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Route to render the 'add-post' template for creating a new post.
router.get('/new', (req, res) => {
    res.render('add-post', {
        loggedIn: true
    });
});

// Export the configured router to be used in other parts of the application.
module.exports = router;