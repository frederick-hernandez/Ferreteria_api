const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('telefonos_clientes', {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    cliente_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'clientes',
        key: 'id'
      }
    },
    telefono: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'telefonos_clientes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "telefonos_clientes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
