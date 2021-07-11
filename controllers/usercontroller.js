const router = require('express').Router();
const {UniqueConstraintError} = require("sequelize/lib/errors");
const {UserModel, CommModel, GameModel} = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const middleware = require('../middleware');


// register user
router.post("/register", async (req, res) => {
    let {username, password, role} = req.body;
    try{
        const newUser = await UserModel.create({
            username,
            password: bcrypt.hashSync(password, 10),
            role
        });

        const token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})

        res.status(201).json({
            message: "User successfully registered!",
            user: newUser,
            sessionToken: token
        })
    }
    catch (err){
        if(err instanceof UniqueConstraintError){
            res.status(409).json({
                message: "Username already in use!",
            })
            
        }else{
            res.status(500).json({
                message: "Failed to register user",
                err: `${err}`
            })
        }

    }
});

// user login
router.post("/login", async (req, res) => {
    let {username, password} = req.body;

    try{
        let loginUser = await UserModel.findOne({
            where: {
                username: username,
            },
        })
        if(loginUser){
            let comparePasswords = await bcrypt.compare(password, loginUser.password);

            if(comparePasswords){

                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24}); 

            res.status(200).json({
                user: loginUser,
                message: "Successfully logged in!",
                sessionToken: token
            })

        } else{
            res.status(401).json({
                message: "Incorrect email or password"
            })
        }} else{
            res.status(401).json({
                message: "Incorrect email or password"
            })
        }
    } catch(err){
        res.status(500).json({
            message: "Failed to log in"
        })
    }
});

// get user by id
router.get("/", middleware.validateSession, async (req, res) =>{
    try {
        const {id} = req.user;
        const getUsername = await UserModel.findOne({
            where: {id: id}
        })
        res.status(200).json({
            message: 'User Retrieved',
            username: getUsername
        })
    } catch(err) {
        res.status(500).json({
            message:`Failed to retrieve username: ${err}`
        })
    }
})

// ADMIN delete user
router.delete('/delete/admin/:userId', middleware.validateSession, async (req, res) => {
    const {userId} = req.params;
    if (req.user.role === 'admin'){
        try{
            const deleteComments = await CommModel.destroy({
                where:{userId: userId}
            })

            const deleteGames = await GameModel.destroy({
                where: {userId: userId}
            })

            const deleteUser = await UserModel.destroy({
                where: { id: userId }
            })

            res.status(200).json({
                message: "User successfully deleted",
                deletedUser: deleteUser,
                deleteGames: deleteGames == 0 ? `No games to delete`: deleteGames,
                deletedComments: deleteComments == 0 ? `No comments to delete`: deleteComments,
            })
        } catch(err){
            res.status(500).json({
                message: `Failed to delete user: ${err}`
            })
            alert('You are not recognized as an administrator!')
        }
    } else{
        res.status(401).json({
            message: `Unauthorized`
        })
    }
})

module.exports = router;