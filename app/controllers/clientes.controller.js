const {models} = require('../config/db.config');

exports.create = async(req,res)=>{
    const { nombre, email, telefono, calle, numero, comuna, ciudad } = req.body;
    try {
        const cliente = await models.clientes.create({ nombre, email });
        const telefonoCliente = await models.telefonos_clientes.create({ cliente_id: cliente.id, telefono });
        const direccionCliente = await models.direcciones_clientes.create({ cliente_id: cliente.id, calle, numero, comuna, ciudad });
        res.status(201).send({
            message: "Cliente creado correctamente.",
            cliente: cliente,
            telefono: telefonoCliente,
            direccion: direccionCliente
        });
    } catch (error) {
        res.status(500).send({
            message: "Error creando el cliente: " + error.message
        });
    }
};

exports.findAll = async(req,res)=>{
    try {
        const clientes = await models.clientes.findAll({include:[{model:models.telefonos_clientes, as: "telefonos_clientes"},{model:models.direcciones_clientes, as: "direcciones_clientes"}]})
        res.send({
            clientes: clientes
        });
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Error al recuperar clientes."
        });
    }
};

exports.findbyid  = (req, res) => {
    const { id } = req.params;
    models.clientes.findByPk(id, { include:[{model:models.telefonos_clientes, as: "telefonos_clientes"},{model:models.direcciones_clientes, as: "direcciones_clientes"}]})
       .then(cliente => {
            if (!cliente) {
                return res.status(404).send({
                    message: "No se encontró ningún cliente con el ID: " + id
                });
            }
            res.send(
                {
                    Cliente : cliente
                });
        })
       .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar el cliente."
            });
        });
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    models.clientes.update({ nombre }, { where: { id: id } })
       .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cliente actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se encontró ningún cliente con el ID: ${id}`
                });
            }
        })
       .catch(err => {
            res.status(500).send({
                message:
                    "Error actualizando el cliente."
            });
        });
};
exports.darBaja = (req, res) => {
    const { id } = req.params;
    models.clientes.update({ status: req.body.status}, { where: { id: id } })
       .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cliente actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se encontró ningún cliente con el ID: ${id}`
                });
            }
        })
       .catch(err => {
            res.status(500).send({
                message:
                    "Error actualizando el cliente."
            });
        });
};
exports.deleteCliente = (req, res) => {
    const { id } = req.params;
  
    // Función para manejar promesas de eliminación y capturar errores sin interrumpir
    const safeDestroy = (model, condition) => {
      return model.destroy({ where: condition })
        .then(() => null)
        .catch(err => {
          console.log(`Error o ningún registro encontrado en ${model.name}:`, err);
          return null;
        });
    };
  
    Promise.all([
      safeDestroy(models.telefonos_clientes, { cliente_id: id }),
      safeDestroy(models.direcciones_clientes, { cliente_id: id })
    ])
    .then(() => {
      return models.clientes.destroy({ where: { id: id } });
    })
    .then(num => {
      if (num === 1) {
        res.send({
          message: "Cliente eliminado correctamente."
        });
      } else {
        res.send({
          message: `No se encontró ningún cliente con el ID: ${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error eliminando el cliente."
      });
    });
  };
  
exports.createTel = (req, res) => {
    const { cliente_id, telefono } = req.body;
    models.telefonos_clientes.create({ cliente_id, telefono })
        .then(telefono => {
            res.send(telefono);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error creando el teléfono."
            });
        });
};

exports.editTel= (req, res) => {
    const { cliente_id, id, telefono} = req.body;
    models.telefonos_clientes.update({ telefono: telefono }, {
         where: { 
            cliente_id: cliente_id , 
            id:id
         } })
        .then(num => {
            if (num == 1) {
                res.send({

                    message: "Teléfono actualizado correctamente."
                });
            } else {
                res.send({
                    message: `No se encontró ningún teléfono con el ID: ${telefono_id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    "Error actualizando el teléfono."
            });
        });
};

exports.selectTel = (req, res) =>{
    const { cliente_id} = req.params;
    models.telefonos_clientes.findAll({ where: { cliente_id: cliente_id} })
       .then(telefono => {
            if (!telefono) {
                return res.status(404).send({
                    message: "No se encontraron teléfonos para el cliente con el ID: " + cliente_id
                });
            }
            res.send({
                telefonos: telefono
            });
        })
       .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar los teléfonos."
            });
        });
}

exports.deleteTel = (req, res) => {
    const { cliente_id, id } = req.body;
    models.telefonos_clientes.destroy({ where: { cliente_id: cliente_id, id: id } })
       .then(num => {
            if (num == 1) {
                res.send({
                    message: "Teléfono eliminado correctamente."
                });
            } else {
                res.send({
                    message: `No se encontró ningún teléfono con el ID: ${id}`
                });
            }
        })
       .catch(err => {
            res.status(500).send({
                message:
                    "Error eliminando el teléfono."
            });
        });
};

exports.insertDire = (req, res) => {
    const { cliente_id, calle, numero, comuna, ciudad } = req.body;
    models.direcciones_clientes.create({ cliente_id, calle, numero, comuna, ciudad })
        .then(direccion => {
            res.send(direccion);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error creando la dirección."
            });
        });
};

exports.editDire = (req, res) => {
        const { cliente_id, id, calle, numero, comuna, ciudad } = req.body;
        models.direcciones_clientes.update({ calle: calle, numero: numero, comuna: comuna, ciudad: ciudad }, {
             where: { 
                cliente_id: cliente_id , 
                id:id
             } })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Dirección actualizada correctamente."
                    });
                } else {
                    res.send({
                        message: `No se encontró ninguna dirección con el ID: ${cliente_id}`
                    });
                }
            });
};

exports.selectDire = (req, res) =>{
    const { cliente_id } = req.params;
    models.direcciones_clientes.findAll({ where: { cliente_id: cliente_id } })
       .then(direccion => {
            if (!direccion) {
                return res.status(404).send({
                    message: "No se encontraron direcciones para el cliente con el ID: " + cliente_id
                });
            }
            res.send({
                direcciones: direccion
            });
        })
       .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error al recuperar las direcciones."
            });
        });
}

exports.deleteDire = (req, res) => {
    const { cliente_id, id } = req.body;
    models.direcciones_clientes.destroy({ where: { cliente_id: cliente_id, id: id } })
       .then(num => {
            if (num == 1) {
                res.send({
                    message: "Dirección eliminada correctamente."
                });
            } else {
                res.send({
                    message: `No se encontró ninguna dirección con el ID: ${id}`
                });
            }
        })
       .catch(err => {
            res.status(500).send({
                message:
                    "Error eliminando la dirección."
            });
        });
};

