const Sequelize = require('sequelize');
const connection = require('../database/database.js');



const User = connection.define('users',{
    email:{
        type: Sequelize.STRING,
        allowNull: false // nao permeti  dados nulos
    },password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})



//User.sync({force: true});

module.exports = User;