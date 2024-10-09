const {models} = require('../config/db.config');

exports.findAll = async(req, res) => {
  try {
    const Pedido = await models.pedidos_cabecera.findAll({
      include: [{ model: models.pedidos_cuerpo, as: "pedidos_cuerpos" }]
    });
    res.send({
      pedido: Pedido
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Error al recuperar clientes."
    });
  }
};


exports.findById =(req, res) => {
    models.pedidos_cabecera.findByPk(req.params.id, {include:[{Cuerpo:models.pedidos_cuerpo, as: "detalle"}]}
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
      fecha_pedido: req.body.fecha,
      direccion_envio: req.body.direccion_envio,
      cliente_id: req.body.cliente_id,

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
    models.pedidos_cabecera.update({ fecha: req.body.fecha, direccion_envio: req.body.direccion_envio, cliente_id: req.body.cliente_id }, { where: { id: id } })
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
    models.pedidos_cuerpo.destroy({where: {pedido_id: id}});
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


exports.createC = (req, res) =>{
  const { pedido_id, producto_id, cantidad } = req.body;
  models.pedidos_cuerpo.create({ pedido_id, producto_id, cantidad })
     .then(data => {
        res.send(data);
      })
     .catch(err => {
        res.status(500).send({
          message:
            err.message || "Error creating the detalle."
        });
      });
}