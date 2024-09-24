const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proveedores', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    telefono: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contacto: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'proveedores',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "proveedores_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
