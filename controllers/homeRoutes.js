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

module.exports = router;