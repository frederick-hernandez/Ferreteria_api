const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('direcciones_clientes', {
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
    calle: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    numero: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    comuna: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ciudad: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'direcciones_clientes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "direcciones_clientes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
