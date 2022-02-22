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

router.get("/create", withAuth, async (req, res) => {
    res.render("create", {logged_in: true});
});

module.exports = router;
