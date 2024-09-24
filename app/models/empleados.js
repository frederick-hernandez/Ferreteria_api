const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('empleados', {
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
    apellido: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    telefono: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    salario: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    area_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'area',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "Activo"
    }
  }, {
    sequelize,
    tableName: 'empleados',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "empleados_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
