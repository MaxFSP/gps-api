const Sequelize = require("sequelize");
const db = require("../util/database");

const Log = db.define("log", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  gps: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Log;
