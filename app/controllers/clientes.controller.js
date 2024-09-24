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
            res.send(cliente);
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
    const { cliente_id, id, nuevo} = req.body;
    models.telefonos_clientes.update({ telefono: nuevo }, {
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
    const { cliente_id,telefono} = req.params;
    models.telefonos_clientes.findAll({ where: { cliente_id: cliente_id ,telefono:telefono} })
       .then(telefono => {
            if (!telefono) {
                return res.status(404).send({
                    message: "No se encontraron teléfonos para el cliente con el ID: " + cliente_id
                });
            }
            res.send(telefono);
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
        const { cliente_id, id, nuevo_calle, nuevo_numero, nuevo_comuna, nuevo_ciudad } = req.body;
        models.direcciones_clientes.update({ calle: nuevo_calle, numero: nuevo_numero, comuna: nuevo_comuna, ciudad: nuevo_ciudad }, {
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
