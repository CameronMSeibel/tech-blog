const sequelize = require("../config/connection");
const {Comment, Post, User} = require("../models");
const commentData = require("./commentData.json");
const postData = require("./postData.json");
const userData = require("./userData.json");

async function seedDB(){
    await sequelize.sync({force: true});
    await User.bulkCreate(userData, {individualHooks: true});
    await Post.bulkCreate(postData);
    await Comment.bulkCreate(commentData);
    sequelize.close();
}

seedDB();
