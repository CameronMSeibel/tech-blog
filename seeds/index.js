const {Comment, Post, User} = require("../models");
const commentData = require("./commentData.json");
const postData = require("./postData.json");
const userData = require("./userData.json");

async function seedDB(){
    await User.bulkBuild(userData);
    await Post.bulkBuild(postData);
    await Comment.bulkBuild(commentData);
}

seedDB();
