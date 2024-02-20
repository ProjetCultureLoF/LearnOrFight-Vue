const { db } = require("../db")
const Sequelize = require('sequelize');
const { Department } = require("../client/departmentModel");

const Theme = db.define("theme", {
    ID_Theme: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Title_Theme: {
        type: Sequelize.STRING,
    }
});

Department.belongsToMany(Theme, {through: "departmentTheme", foreignKey: "ID_Department"})
Theme.belongsToMany(Department, {through: "departmentTheme", foreignKey: "ID_Theme"})

module.exports = {db, Theme, Department};