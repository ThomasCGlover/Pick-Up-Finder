require('dotenv').config();

const Sequelize = require('sequelize');

// const db = new Sequelize(process.env.DB_CONNECTION_STRING);

const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'production'
});

module.exports = db;