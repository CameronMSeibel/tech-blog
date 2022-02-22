const router = require("express").Router();
const {User, Post, Comment} = require("../models");
const sequelize = require("../config/connection");

/**
 * Render homepage with all blog posts.
 */
router.get("/", async (req, res) => {
    const postData = await Post.findAll({
        attributes: ["id", "title", "text", [sequelize.fn("DATE_FORMAT", sequelize.col("posted"), "%m/%d/%Y"), "posted"]],
        include: [{model: User, attributes: ["name"]}]
    });
    const posts = postData.map((post) => post.toJSON());
    res.render("blog", {logged_in: req.session.logged_in, posts});
});

/**
 * Go to login page if not logged in.
 */
router.get("/login", async (req, res) => {
    if(req.session.logged_in){
        return res.redirect("/");
    }
    res.render("login");
})

/**
 * Go to signup page if not logged in.
 */
router.get("/signup", async (req, res) => {
    if(req.session.logged_in){
        return res.redirect("/");
    }
    res.render("signup");
})

/**
 * Render a single view of a blog post when given an ID corresponding to a blog post.
 */
 router.get("/:id", async (req, res) => {
    let post = await Post.findByPk(req.params.id, {
        attributes: ["id", "title", "text", [sequelize.fn("DATE_FORMAT", sequelize.col("post.posted"), "%m/%d/%Y"), "posted"]],
        include: [
            {model: User, attributes: ["name"]},
            {model: Comment, attributes: ["text", [sequelize.fn("DATE_FORMAT", sequelize.col("comments.posted"), "%m/%d/%Y"), "posted"]], include: [{model: User, attributes: ["name"]}]}
        ]
    });
    if(!post){
        return res.status(404).redirect("/");
    }
    post = post.toJSON();
    res.render("blog-single", {logged_in: req.session.logged_in, post})
});

module.exports = router;