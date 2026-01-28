const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MovimientoInventario = sequelize.define('MovimientoInventario', {
  id_movimiento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_insumo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  tipo_movimiento: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  motivo: {
    type: DataTypes.TEXT,
  },
  id_referencia_origen: {
    type: DataTypes.INTEGER,
  },
  tabla_referencia_origen: {
    type: DataTypes.STRING(50),
  },
}, {
  tableName: 'movimientos_inventario',
  timestamps: false,
});

module.exports = MovimientoInventario;