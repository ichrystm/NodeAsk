
const Sequelize = require('sequelize')
const connection = require('./database')

const answer = connection.define("answers", {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    askid: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

//answer.sync({force: false})

module.exports = answer