const {models} = require('../config/db.config');


exports.findAll =(req, res) => {
    models.pedidos_cabecera.findAll()
   .then(data => {
     res.send({
      cabecera: data
    });
    })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Error retrieving proveedores."
     });
    });
};

exports.findById =(req, res) => {
    models.pedidos_cabecera.findByPk(req.params.id, {include:[{model:models.proveedores, as: "proveedor"}, {model:models.clientes, as: "cliente"}, {model:models.pedidos_detalle, as: "detalle"}]}
    )
   .then(data => {
     if (!data) {
       res.status(404).send({
         message: "No se encontró pedido con el ID: " + req.params.id
       });
       return;
     }
     res.send(data);
    })
   .catch(err => {
     res.status(500).send({
       message: "Error retrieving pedido with id=" + req.params.id
     });
    });
};

exports.create = (req, res) => {
    models.pedidos_cabecera.create({
      fecha: req.body.fecha,
      proveedor_id: req.body.proveedor_id,
      cliente_id: req.body.cliente_id
    })
   .then(data => {
     res.send(data);
    })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Error creating the pedido."
     });
    });
};

exports.update = (req, res) => {
    const { id } = req.params;
    models.pedidos_cabecera.update({ fecha: req.body.fecha, proveedor_id: req.body.proveedor_id, cliente_id: req.body.cliente_id }, { where: { id: id } })
       .then(num => {
            if (num == 1) {
                res.send({
                  message: "Pedido actualizado correctamente."
                });
            } else {
                res.send({
                  message: `No se pudo actualizar el pedido con el ID: ${id}.`
                });
            }
        })
       .catch(err => {
            res.status(500).send({
                message: "Error actualizando el pedido con el ID: " + id
            });
        });
};

exports.delete = (req, res) => {
    const { id } = req.params;
    models.pedidos_cabecera.destroy({ where: { id: id } })
       .then(num => {
            if (num == 1) {
                res.send({
                  message: "Pedido eliminado correctamente."
                });
            } else {
                res.send({
                  message: `No se pudo eliminar el pedido con el ID: ${id}.`
                });
            }
        })
       .catch(err => {
            res.status(500).send({
                message: "Error eliminando el pedido con el ID: " + id
            });
        });
};

