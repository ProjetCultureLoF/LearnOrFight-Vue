const { db } = require("../db")
const Sequelize = require('sequelize');

const Department = db.define("department", {
    ID_Department: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name_Department: {
        type: Sequelize.STRING,
    },
    Code_Department: {
        type: Sequelize.STRING,
        unique: true
    },
});

module.exports = {db, Department};