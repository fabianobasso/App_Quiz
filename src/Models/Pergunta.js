const { Sequelize, DataTypes } = require('sequelize')
const connection = require('../database/database')

const Pergunta = connection.define('pergunta', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    describe: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

Pergunta.sync({ force: false }).then(() => {})

module.exports = Pergunta
