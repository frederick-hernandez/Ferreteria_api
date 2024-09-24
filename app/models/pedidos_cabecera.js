const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pedidos_cabecera', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    cliente_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'id'
      }
    },
    direccion_envio: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fecha_pedido: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'pedidos_cabecera',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pedidos_cabecera_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
