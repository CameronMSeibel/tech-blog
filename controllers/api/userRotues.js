const router = require("express").Router();
const {User} = require("../../models");

/**
 * Create a new User if supplied with with a proper body.
 */
router.post("/", async (req, res) => {
    try{
        const userData = await User.create(req.body);
        
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json(userData.toJSON());
        });
    }catch(error){
        res.status(500).json(error);
    }
})

/**
 * Log a user in and create a session if supplied with a good username and password.
 */
router.post("/login", async (req, res) => {
    try{
        console.log(req.body.name);
        const userData = await User.findOne({ where: { name: req.body.name } });
    
        if(!userData){
            res.status(404).json({ message: "Incorrect email or password, please try again." });
            return;
        }
        console.log(req.body.password);
        const validPassword = await userData.checkPassword(req.body.password);
    
        if(!validPassword){
            res.status(400).json({ message: "Incorrect email or password, please try again." });
            return;
        }
    
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: "You are now logged in!" });
        });
  
    }catch(error){
        console.error(error);
        res.status(500).json({error});
    }
});

/**
 * Log a user out, terminate their session.
 */
router.post("/logout", (req, res) => {
    if(req.session.logged_in){
        req.session.destroy(() => {
            res.status(204).end();
        });
    }else{
        res.status(404).end();
    }
});


module.exports = router;
