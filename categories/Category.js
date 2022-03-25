const Sequelize = require('sequelize');
const connection = require('../database/database.js');



const Category = connection.define('categories',{
    title:{
        type: Sequelize.STRING,
        allowNull: false // nao permeti  dados nulos
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
})



//Category.sync({force: true})

module.exports = Category;