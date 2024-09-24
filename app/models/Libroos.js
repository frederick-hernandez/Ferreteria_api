const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Libroos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    id_autor: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    isbn: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    editorial: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    anio_pl: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoria: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cantidad_disponible: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ubicacion: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Libroos',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Libroos_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
