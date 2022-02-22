const router = require("express").Router();
const {User, Post, Comment} = require("../../models");

/**
 * Get all blog posts as JSON. Excludes comments.
 */
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

/**
 * Get blog post and comments for a given blog post's ID.
 */
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

/**
 * Create a new blog post. Request body should be JSON with keys "title", and "text"
 */
router.post("/", async (req, res) => {
    try{
        const post = await Post.create({
                title: req.body.title,
                text: req.body.text,
                user_id: req.session.user_id
            });
        res.status(200).json(post);
    }catch(error){
        res.status(500).json({error});
    }
});

/**
 * Create a new comment on a blog post. Request body should be JSON with keys "text" and "post_id", 
 * where "post_id" is a number referencing the ID of a blog post.
 */
router.post("/comment", async (req, res) => {
    try{
        const comment = await Comment.create({
            text: req.body.text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });
        res.status(200).json(comment);
    }catch(error){
        res.status(500).json({error});
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const result = await Post.destroy({
            where: {
                user_id: req.session.user_id,
                id: req.params.id
            }
        })
        if(!result){
            return res.status(404).json({error: "No posts deleted."});
        }
        res.status(204).json({message: "Post deleted."})
    }catch(error){
        res.status(500).json({error});
    }
})

module.exports = router;
