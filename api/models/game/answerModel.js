const { db } = require("../db")
const Sequelize = require('sequelize');

const Answer = db.define("answer", {
    ID_Answer: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Text_Answer: {
        type: Sequelize.STRING,
    }
});

module.exports = {db, Answer};