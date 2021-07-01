const router = require('express').Router();
const {GameModel} = require('../models');
const middleware = require('../middleware');

// create game
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

module.exports = router;