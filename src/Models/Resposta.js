const { Sequelize, DataTypes } = require('sequelize')
const connection = require('../database/database')

const Resposta = connection.define('respostas',{
    corpo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Resposta.sync({ force: false })

module.exports = Resposta