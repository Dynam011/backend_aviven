const { sequelize, Role, Usuario } = require('../models');
const bcrypt = require('bcryptjs');

const seed = async () => {
  await sequelize.sync({ force: true }); // Borra y recrea tablas (solo para desarrollo)

  const adminRole = await Role.create({ nombre: 'Admin', descripcion: 'Administrador' });
  const userRole = await Role.create({ nombre: 'Usuario', descripcion: 'Usuario normal' });

  await Usuario.create({
    nombre_usuario: 'admin',
    nombre_completo: 'Administrador',
    password_hash: bcrypt.hashSync('password123', 10),
    id_rol: adminRole.id_rol,
  });

  console.log('Seeding completado');
  process.exit();
};

seed();