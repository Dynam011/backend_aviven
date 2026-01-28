const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING(50),
  },
  contacto: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  direccion: {
    type: DataTypes.TEXT,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'clientes',
  timestamps: false,
});

module.exports = Cliente;