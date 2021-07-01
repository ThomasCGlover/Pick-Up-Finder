const db = require('../db');

const UserModel = require('./user');
const GameModel = require('./game');
const CommModel = require('./comment');

UserModel.hasMany(GameModel);
GameModel.belongsTo(UserModel);

UserModel.hasMany(CommModel);
CommModel.belongsTo(UserModel);

GameModel.hasMany(CommModel);
CommModel.belongsTo(GameModel);

module.exports = {
    // dbConnection: db,
    
    GameModel, UserModel, CommModel,
    
};