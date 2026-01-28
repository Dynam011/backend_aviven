const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Galpon = sequelize.define('Galpon', {
  id_galpon: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ventilacion: {
    type: DataTypes.STRING(50),
  },
  iluminacion: {
    type: DataTypes.STRING(50),
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'galpones',
  timestamps: false,
});

module.exports = Galpon;