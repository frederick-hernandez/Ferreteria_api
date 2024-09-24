const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    publisher: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    author: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    authorCountry: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    pageNumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    publicationYear: {
      type: DataTypes.DATE,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'books',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "books_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
