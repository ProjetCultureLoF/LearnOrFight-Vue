const { db } = require("../db")
const Sequelize = require('sequelize');

const Quiz = db.define("quiz", {
    ID_Quiz: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Question_Quiz: {
        type: Sequelize.STRING,
    }
});

module.exports = {db, Quiz};