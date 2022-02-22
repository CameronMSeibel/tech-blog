const router = require("express").Router();
const {User, Post, Comment} = require("../models");

router.get("/", async (req, res) => {
    const posts = await Post.findAll({
        attributes: ["title", "text", "posted"],
        include: [{model: User, attributes: ["name"]}]
    });
    res.render("blog", {logged_in: req.session.logged_in, posts});
});

router.get("/login", async (req, res) => {
    if(req.session.logged_in){
        return res.redirect("/");
    }
    res.render("login");
})

module.exports = router;