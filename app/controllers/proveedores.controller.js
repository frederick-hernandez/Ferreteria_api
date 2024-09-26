const {models} = require('../config/db.config');



exports.findAll =(req, res) => {
    models.proveedores.findAll()
   .then(data => {
     res.send({
      Proveedores: data
    });
    })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Error retrieving proveedores."
     });
    });
};

exports.create =(req, res) => {
  const { nombre, direccion, telefono } = req.body;
  models.proveedores.create({ nombre, direccion, telefono })
    .then(proveedor => {
      res.send(proveedor);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error creando el proveedor."
      });
    });
};

exports.findOne =(req, res) => {
  const id = req.params.id;
  models.proveedores.findByPk(id)
    .then(proveedor => {
      if (!proveedor) {
        return res.status(404).send({
          message: "No se encontró el proveedor con el ID: " + id
        });
      }
      res.send(proveedor);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al buscar el proveedor con el ID: " + id
      });
    });
};

exports.update =(req, res) => {
  const id = req.params.id;
  const { nombre, direccion, telefono } = req.body;
  models.proveedores.update({ nombre, direccion, telefono }, {
    where: { id: id }
  })
   .then(num => {
     if (num == 1) {
       res.send({
         message: "Proveedor actualizado correctamente."
       });
     } else {
       res.send({
         message: `No se encontró ningún proveedor con el ID: ${id}`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Error actualizando el proveedor con el ID: " + id
     });
   });
};