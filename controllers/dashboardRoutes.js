const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User } = require("../models");
const { withAuth } = require("../utils/authentication");

/**
 * Render user dashboard if logged in.
 */
router.get("/", withAuth, async (req, res) => {
    const postData = await Post.findAll({
        attributes: ["id", "title", "text", [sequelize.fn("DATE_FORMAT", sequelize.col("posted"), "%m/%d/%Y"), "posted"]],
        include: [{model: User, attributes: ["name"]}],
        where: {
            user_id: req.session.user_id
        }
    });
    const posts = postData.map((post) => post.toJSON());
    res.render("dashboard", {logged_in: true, posts});
});

/**
 * Render blog post create page if logged in.
 */
router.get("/create", withAuth, async (req, res) => {
    res.render("create", {logged_in: true});
});

/**
 * Render edit page with selected post if logged in.
 */
router.get("/edit/:id", withAuth, async (req, res) => {
    let post = await Post.findByPk(req.params.id, {
        where: {
            user_id: req.session.user_id
        }
    });
    if(!post){
        return res.status(404).redirect("/dashboard");
    }
    post = post.toJSON()
    res.render("edit", {logged_in: true, post});
});

module.exports = router;
