const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DTC = sequelize.define('dtc', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  symptoms: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  causes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  diagnostic: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'dtc_codes',
  underscored: true,
});

module.exports = DTC;
