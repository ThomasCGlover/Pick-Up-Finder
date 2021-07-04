const router = require('express').Router();
const {GameModel} = require('../models');
const {CommModel} = require('../models');
const middleware = require('../middleware');
const models = require('../models');

// creates game
router.post("/create", middleware.validateSession, async (req, res) => {
    const {city, address, playersNeeded, time, date, skillPref} = req.body;
    const {id} = req.user;
    const createGame = {
        city,
        address,
        playersNeeded,
        time,
        date,
        skillPref,
        userId: id
    }

    try{
        const newGame = await GameModel.create(
            createGame
        );
        res.status(201).json({
            message: 'Game successfully created',
            newGame
        })
    } catch(err){
        res.status(500).json({
            message: 'Failed to create Game',
            error: `${err}`
        })
    }
})

// gets game by city
router.get("/search", middleware.validateSession, async (req, res) => {
    try{
        const {searchedCity} = req.body;
        const gamesbyCity = await GameModel.findAll({
            where: {city: searchedCity}
        })
        res.status(200).json(
            gamesbyCity
        )
    }catch(err){
        res.status(500).json({
            error: `${err}`
        })
    }
})

// allows user to delete a game they've created
router.delete('/delete', middleware.validateSession, async (req, res) => {
    const {id} = req.user;
    const {GameId} = req.body;
    try {
        const deletedGame = await GameModel.destroy({
            where: { 
                userId: id,
                id: GameId,

            }
        })
        res.status(200).json({
            message: "Game successfully deleted",
            deletedGame: deletedGame === 0? 'none' : deletedGame,
        })
    } catch (err) {
        res.status(500).json({
            message: `Failed to delete game: ${err}`
        })
    }
})

// gets all games for individual users with associated comments included
router.get("/:id", middleware.validateSession, async (req,res) => {
    try {
        const userGames = await GameModel.findAll({
            where: {userId:req.params.id},
                    include: CommModel
                }
            
        )
        res.status(200).json(userGames);
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

// allows user to edit game they've created
router.put('/edit/:id', middleware.validateSession, async (req, res) =>{
    const {city, address, playersNeeded, time, date, skillPref} = req.body;
    const {id} = req.user;
    try{
        const gameUpdate = await GameModel.update({
            city, address, playersNeeded, time, date, skillPref},
            {where: { 
                id: req.params.id,
                userId: id,

            }}
            )
            res.status(200).json({
                message: `Game successfully updated`,
                gameUpdate
            })
    }catch(err) {
        res.status(500).json({
            message: `Failed to update game: ${err}`
        })
    }
})



module.exports = router;