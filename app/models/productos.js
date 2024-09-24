const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productos', {
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
    precio_actual: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    proveedor_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'proveedores',
        key: 'id'
      }
    },
    precio_unitario: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    precio_costo: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'productos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "productos_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
