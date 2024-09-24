const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "usuarios_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
