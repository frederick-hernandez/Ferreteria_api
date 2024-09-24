const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('customers', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    copyrightby: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "UMG Antigua"
    }
  }, {
    sequelize,
    tableName: 'customers',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "customers_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
