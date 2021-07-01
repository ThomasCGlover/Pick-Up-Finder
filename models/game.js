const {DataTypes} = require('sequelize');
const db = require('../db');

const Game = db.define("Game", {
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    playersNeeded: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    skillPref: {
        type: DataTypes.STRING,
    }
})

module.exports = Game;