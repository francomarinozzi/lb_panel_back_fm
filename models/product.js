const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING, // Esto equivale a VARCHAR(255)
    allowNull: false,       // No permitimos productos sin nombre
  },
  unidad: {
    type: DataTypes.STRING, // Ej: "kg", "litro", "unidad", "pack"
    allowNull: false,
  },
  precio: {
    // DECIMAL(10, 2) significa: 10 dígitos en total, de los cuales 2 son decimales.
    // Ej: Se banca hasta 99.999.999,99.
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false,
    get() {
      // Un truquito: Postgres devuelve los DECIMAL como strings para no perder precisión.
      // Acá lo convertimos a float de JS para que el front lo reciba como número.
      const rawValue = this.getDataValue('precio');
      return rawValue ? parseFloat(rawValue) : null;
    }
  }
}, {
  tableName: 'productos', // Para forzar que la tabla se llame 'productos' en la DB
  timestamps: true,       // Te crea createdAt y updatedAt solos (muy útil)
});

module.exports = Producto;