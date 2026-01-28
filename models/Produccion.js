const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produccion = sequelize.define('Produccion', {
  id_produccion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_lote: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_insumo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  observaciones: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'produccion',
  timestamps: false,
});

module.exports = Produccion;