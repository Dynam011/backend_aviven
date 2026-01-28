const sequelize = require('../config/database');

// Importar modelos
const Role = require('./Role');
const Usuario = require('./Usuario');
const Galpon = require('./Galpon');
const Lote = require('./Lote');
const GalloReproductor = require('./GalloReproductor');
const Insumo = require('./Insumo');
const Produccion = require('./Produccion');
const MovimientoInventario = require('./MovimientoInventario');
const Proveedor = require('./Proveedor');
const Cliente = require('./Cliente');
const Compra = require('./Compra');
const Venta = require('./Venta');
const Pago = require('./Pago');

// Definir asociaciones
Role.hasMany(Usuario, { foreignKey: 'id_rol' });
Usuario.belongsTo(Role, { foreignKey: 'id_rol' });

Galpon.hasMany(Lote, { foreignKey: 'id_galpon' });
Lote.belongsTo(Galpon, { foreignKey: 'id_galpon' });

Galpon.hasMany(GalloReproductor, { foreignKey: 'id_galpon' });
GalloReproductor.belongsTo(Galpon, { foreignKey: 'id_galpon' });

Lote.hasMany(Produccion, { foreignKey: 'id_lote' });
Produccion.belongsTo(Lote, { foreignKey: 'id_lote' });

Insumo.hasMany(Produccion, { foreignKey: 'id_insumo' });
Produccion.belongsTo(Insumo, { foreignKey: 'id_insumo' });

Insumo.hasMany(MovimientoInventario, { foreignKey: 'id_insumo' });
MovimientoInventario.belongsTo(Insumo, { foreignKey: 'id_insumo' });

Usuario.hasMany(Cliente, { foreignKey: 'id_usuario' });
Cliente.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Proveedor.hasMany(Compra, { foreignKey: 'id_proveedor' });
Compra.belongsTo(Proveedor, { foreignKey: 'id_proveedor' });

Insumo.hasMany(Compra, { foreignKey: 'id_insumo' });
Compra.belongsTo(Insumo, { foreignKey: 'id_insumo' });

Cliente.hasMany(Venta, { foreignKey: 'id_cliente' });
Venta.belongsTo(Cliente, { foreignKey: 'id_cliente' });

Insumo.hasMany(Venta, { foreignKey: 'id_insumo' });
Venta.belongsTo(Insumo, { foreignKey: 'id_insumo' });

Venta.hasMany(Pago, { foreignKey: 'id_venta' });
Pago.belongsTo(Venta, { foreignKey: 'id_venta' });

module.exports = {
  sequelize,
  Role,
  Usuario,
  Galpon,
  Lote,
  GalloReproductor,
  Insumo,
  Produccion,
  MovimientoInventario,
  Proveedor,
  Cliente,
  Compra,
  Venta,
  Pago,
};