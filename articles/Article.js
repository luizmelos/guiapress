const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('../categories/Category')

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})



//Dizendo que uma categoria tem muitos artigos: 1 para N:
Category.hasMany(Article)

//Dizendo aqui que o artigo pertence a uma categoria: 1 para 1:
Article.belongsTo(Category)


module.exports = Article