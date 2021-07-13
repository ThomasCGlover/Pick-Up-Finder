const db = require('../db');

const UserModel = require('./user');
const GameModel = require('./game');
const CommModel = require('./comment');

UserModel.hasMany(GameModel, {
    as: 'games',
    foreignKey: 'userId'
});


UserModel.hasMany(CommModel, {
    foreignKey: "userId",
});

GameModel.hasMany(CommModel, {
    foreignKey: "GameId",
});

GameModel.belongsTo(UserModel);
CommModel.belongsTo(GameModel);


module.exports = {
    
    GameModel, UserModel, CommModel,
    
};