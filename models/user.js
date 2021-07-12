const {DataTypes} = require('sequelize');
const db = require('../db');


const User = db.define('user', {
    username: {
        type: DataTypes.STRING(5,20),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(5,20),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM({
            values: ['user', 'admin']
        }),
        allowNull: false,
        defaultValue: 'user'
    },
    
});

module.exports = User;