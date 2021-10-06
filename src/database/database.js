const Sequelize = require('sequelize')

const connection = new Sequelize('guia_perguntas','root','devNode2021',{
    host: 'localhost',
    dialect: 'mariadb'
})

module.exports = connection