const Sequelize = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './api/database.sqlite',
    define: {
        timestamps: false
    }
  });

module.exports = { db }

