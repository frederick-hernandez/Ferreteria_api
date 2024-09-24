const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('libros', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    editorial: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    autor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    genero: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    PaisAutor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    NoPag: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AnioEdit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Precio: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'libros',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "libros_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
