const Sequelize = require('sequelize');

const connection = new Sequelize('', '', '',{
    host: 'localhost',
    dialect: 'postgres'
});
module.exports = connection;
