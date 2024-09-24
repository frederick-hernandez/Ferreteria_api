var DataTypes = require("sequelize").DataTypes;
var _Libroos = require("./Libroos");
var _area = require("./area");
var _books = require("./books");
var _clientes = require("./clientes");
var _customers = require("./customers");
var _direcciones_clientes = require("./direcciones_clientes");
var _empleados = require("./empleados");
var _libros = require("./libros");
var _pedidos_cabecera = require("./pedidos_cabecera");
var _pedidos_cuerpo = require("./pedidos_cuerpo");
var _productos = require("./productos");
var _proveedores = require("./proveedores");
var _pruebas = require("./pruebas");
var _telefonos_clientes = require("./telefonos_clientes");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var Libroos = _Libroos(sequelize, DataTypes);
  var area = _area(sequelize, DataTypes);
  var books = _books(sequelize, DataTypes);
  var clientes = _clientes(sequelize, DataTypes);
  var customers = _customers(sequelize, DataTypes);
  var direcciones_clientes = _direcciones_clientes(sequelize, DataTypes);
  var empleados = _empleados(sequelize, DataTypes);
  var libros = _libros(sequelize, DataTypes);
  var pedidos_cabecera = _pedidos_cabecera(sequelize, DataTypes);
  var pedidos_cuerpo = _pedidos_cuerpo(sequelize, DataTypes);
  var productos = _productos(sequelize, DataTypes);
  var proveedores = _proveedores(sequelize, DataTypes);
  var pruebas = _pruebas(sequelize, DataTypes);
  var telefonos_clientes = _telefonos_clientes(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);

  empleados.belongsTo(area, { as: "area", foreignKey: "area_id"});
  area.hasMany(empleados, { as: "empleados", foreignKey: "area_id"});
  direcciones_clientes.belongsTo(clientes, { as: "cliente", foreignKey: "cliente_id"});
  clientes.hasMany(direcciones_clientes, { as: "direcciones_clientes", foreignKey: "cliente_id"});
  pedidos_cabecera.belongsTo(clientes, { as: "cliente", foreignKey: "cliente_id"});
  clientes.hasMany(pedidos_cabecera, { as: "pedidos_cabeceras", foreignKey: "cliente_id"});
  telefonos_clientes.belongsTo(clientes, { as: "cliente", foreignKey: "cliente_id"});
  clientes.hasMany(telefonos_clientes, { as: "telefonos_clientes", foreignKey: "cliente_id"});
  pedidos_cuerpo.belongsTo(pedidos_cabecera, { as: "pedido", foreignKey: "pedido_id"});
  pedidos_cabecera.hasMany(pedidos_cuerpo, { as: "pedidos_cuerpos", foreignKey: "pedido_id"});
  pedidos_cuerpo.belongsTo(productos, { as: "producto", foreignKey: "producto_id"});
  productos.hasMany(pedidos_cuerpo, { as: "pedidos_cuerpos", foreignKey: "producto_id"});
  productos.belongsTo(proveedores, { as: "proveedor", foreignKey: "proveedor_id"});
  proveedores.hasMany(productos, { as: "productos", foreignKey: "proveedor_id"});

  return {
    Libroos,
    area,
    books,
    clientes,
    customers,
    direcciones_clientes,
    empleados,
    libros,
    pedidos_cabecera,
    pedidos_cuerpo,
    productos,
    proveedores,
    pruebas,
    telefonos_clientes,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
