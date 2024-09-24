const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pruebas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pruebas',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "pruebas_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
