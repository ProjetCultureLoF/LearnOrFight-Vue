const { db } = require("../db")
const Sequelize = require('sequelize');

const Clan = db.define("clan", {
    ID_Clan: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Title_Clan: {
        type: Sequelize.STRING,
    }
});


module.exports = {db, Clan};