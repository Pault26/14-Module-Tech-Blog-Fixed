// Import the 'express' library and create a router instance.
const router = require('express').Router();

// Import necessary models for the routes: User, Post, and Comment.
const { User, Post, Comment } = require('../../models');

// Import the 'withAuth' middleware for authentication.
const withAuth = require('../../utils/auth');

// Route to get all posts, including user and comment information.
router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "content", "title", "created_at"],
        order: [["created_at", "DESC"]],
        include: [
            {
                model: User,
                attributes: ["username"],
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
        ],
    })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Route to get a single post by ID, including user and comment information.
router.get("/:id", (req, res) => {
    Post.findOne({
        where: { id: req.params.id },
        attributes: ["id", "content", "title", "created_at"],
        include: [
            {
                model: User,
                attributes: ["username"],
            },
            {
                model: Comment,
                attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User,
                    attributes: ["username"],
                },
            },
        ],
    })
    .then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with this id" });
            return;
        }
        res.json(dbPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Route to create a new post with authentication.
router.post("/", withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.post_content,
        user_id: req.session.user_id,
    })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Route to update a post with authentication.
router.put("/:id", withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            content: req.body.post_content,
        },
        {
            where: { id: req.params.id },
        }
    )
    .then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with this id" });
            return;
        }
        res.json(dbPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Route to delete a post with authentication.
router.delete("/:id", withAuth, (req, res) => {
    Post.destroy({
        where: { id: req.params.id },
    })
    .then((dbPostData) => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with this id" });
            return;
        }
        res.json(dbPostData);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Export the configured router to be used in other parts of the application.
module.exports = router;