const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('area', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    nombre_area: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    porcentaje_comision: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'area',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "area_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
