
const Sequelize = require('sequelize')
const connection = require('./database')

const ask = connection.define('ask', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

/*ask.sync({force: false})
.then(() => {
    console.log("OK!")
})
.catch((err) => {
    console.log("Ocorreu um erro: " + err)
})*/

module.exports = ask