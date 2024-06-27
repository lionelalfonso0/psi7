const { Sequelize } = require('sequelize');
const sequelize = require('../config/db_sequelize');

// Definir la estructura del producto
const Usuarios = sequelize.define('usuarios', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  apellido: {
    type: Sequelize.STRING,
    defaultValue: 0
  },
  gmail: {
    type: Sequelize.STRING,
    defaultValue: 0
  },
  contraseña: {
    type: Sequelize.STRING,
    defaultValue: 0
  }
}, {
  timestamps: false
})

Usuarios.sync();
Usuarios.sync({alter: true});

module.exports = Usuarios;