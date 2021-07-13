const {DataTypes} = require('sequelize');
const db = require('../db');

const Comm = db.define("comment", {
    content: {
        type: DataTypes.TEXT,
    },
    username: {
        type: DataTypes.STRING,
    }
})

module.exports = Comm;