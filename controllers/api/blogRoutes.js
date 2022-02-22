const router = require("express").Router();
const {User, Post, Comment} = require("../../models");

router.get("/", async (req, res) => {
    try{
        const postData = await Post.findAll({
            attributes: ["title", "text", "posted"],
            include: [{model: User, attributes: ["name"]}]
        });
        res.status(200).json(postData);
    }catch(error){
        console.error(error);
        res.status(500).json({error});
    }
});

router.get("/:id", async (req, res) => {
    try{
        const post = await Post.findByPk(req.params.id, {
                include: [
                    {model: User, attributes: ["name"]},
                    {model: Comment, attributes: ["text", "posted"], include: [{model: User, attributes: ["name"]}]}
                ]
            });
        if(!post){
            return res.status(404).json({error: "Post not found."});
        }
        res.status(200).json(post);
    }catch(error){
        res.status(500).json({error});
    }
});

router.post("/", async (req, res) => {
    try{
        const post = await Post.create(req.body);
        res.status(200).json(post);
    }catch(error){
        res.status(500).json({error});
    }
});

router.post("/comment", async (req, res) => {
    try{
        const comment = await Comment.create(req.body);
        res.status(200).json(comment);
    }catch(error){
        res.status(500).json({error});
    }
});

module.exports = router;
