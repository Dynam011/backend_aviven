const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Proveedor = sequelize.define('Proveedor', {
  id_proveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING(100),
  },
  contacto: {
    type: DataTypes.STRING(100),
  },
  telefono: {
    type: DataTypes.STRING(50),
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
  },
  direccion: {
    type: DataTypes.TEXT,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'proveedores',
  timestamps: false,
});

module.exports = Proveedor;