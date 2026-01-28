const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lote = sequelize.define('Lote', {
  id_lote: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  codigo_lote: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING(50),
  },
  fecha_ingreso: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cantidad_inicial: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING(50),
    defaultValue: 'Activo',
  },
  id_galpon: {
    type: DataTypes.INTEGER,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'lotes',
  timestamps: false,
});

module.exports = Lote;