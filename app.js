const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const rolesRoutes = require('./routes/roles');
const usuariosRoutes = require('./routes/usuarios');
const galponesRoutes = require('./routes/galpones');
const lotesRoutes = require('./routes/lotes');
const gallosReproductoresRoutes = require('./routes/gallosReproductores');
const insumosRoutes = require('./routes/insumos');
const produccionRoutes = require('./routes/produccion');
const movimientosInventarioRoutes = require('./routes/movimientosInventario');
const proveedoresRoutes = require('./routes/proveedores');
const clientesRoutes = require('./routes/clientes');
const comprasRoutes = require('./routes/compras');
const ventasRoutes = require('./routes/ventas');
const pagosRoutes = require('./routes/pagos');
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/auth', authRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/galpones', galponesRoutes);
app.use('/api/lotes', lotesRoutes);
app.use('/api/gallos-reproductores', gallosReproductoresRoutes);
app.use('/api/insumos', insumosRoutes);
app.use('/api/produccion', produccionRoutes);
app.use('/api/movimientos-inventario', movimientosInventarioRoutes);
app.use('/api/proveedores', proveedoresRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/compras', comprasRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/pagos', pagosRoutes);

// ... usar todas las rutas

app.use(errorHandler);

module.exports = app;