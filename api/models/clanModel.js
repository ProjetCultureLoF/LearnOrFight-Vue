const { db } = require("./db")
const Sequelize = require('sequelize');
const { User } = require('./userModel');

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

User.belongsTo(Clan, {foreignKey: "ID_User"})
Clan.hasMany(User, {foreignKey: "ID_Clan"})

module.exports = {db, Clan, User};