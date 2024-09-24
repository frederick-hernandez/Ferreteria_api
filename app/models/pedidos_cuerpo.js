const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pedidos_cuerpo', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    pedido_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'pedidos_cabecera',
        key: 'id'
      }
    },
    producto_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'productos',
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'pedidos_cuerpo',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pedidos_cuerpo_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
