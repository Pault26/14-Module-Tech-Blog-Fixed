// Import the 'express' library and create a router instance.
const router = require('express').Router();

// Import the Sequelize connection instance from the '../config/connection' path.
const sequelize = require('../config/connections');

// Import necessary models for the routes: User, Post, and Comment.
const { User, Post, Comment } = require('../models');

// Route to fetch all posts and associated comments and render them on the homepage.
router.get('/', (req, res) => {
    Post.findAll({
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

        // Render the 'homepage' template with posts and login status.
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Route to fetch a single post by ID and its associated comments, then render it.
router.get('/post/:id', (req, res) => {
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

        // Render the 'single-post' template with the fetched post and login status.
        const post = dbPostData.get({ plain: true });
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Route to render the login page if not already logged in.
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        // Redirect to the homepage if already logged in.
        res.redirect('/');
        return;
    }

    res.render('login');
});

// Route to render the signup page if not already logged in.
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        // Redirect to the homepage if already logged in.
        res.redirect('/');
        return;
    }

    res.render('signup');
});

// Route for handling unmatched routes, returns a 404 response.
router.get('*', (req, res) => {
    res.status(404).send("Can't go there!");
});

// Export the configured router to be used in other parts of the application.
module.exports = router;