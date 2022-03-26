const Sequelize = require('sequelize');
const connection = require('../database/database.js');
const Category = require("../categories/Category.js")

const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false // nao permeti  dados nulos
    },slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
         allowNull: false

    }
})
        // tem muitos
Category.hasMany(Article);
        //pertence a 
Article.belongsTo(Category);

//Article.sync({force: true});


module.exports = Article;