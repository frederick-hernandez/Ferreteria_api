const {models} = require('../config/db.config');


exports.findAll =(req, res) => {
    models.area.findAll()
   .then(data => {
     res.send({
      Area: data
    });
    })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Error retrieving Area"
     });
    });
};

exports.findById =(req, res) => {
  models.area.findByPk(req.params.id)
 .then(data => {
   if (!data) {
     res.status(404).send({
       message: "No se encontro la area con el ID: " + req.params.id
     });
   } else {
     res.send({
      area: data
    });
   }
 })
 .catch(err => {
   res.status(500).send({
     message: "Error retrieving Area with id=" + req.params.id
   });
 });
};

exports.create =(req, res) => {
  const area = {
    nombre_area: req.body.nombre_area,
    porcentaje_comision: req.body.porcentaje_comision
  };
  models.area.create(area)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Error creando la area."
    });
  });
};

exports.update =(req, res) => {
  const id = req.params.id;
  models.area.update(req.body, {where: {id: id}})
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Area actualizada correctamente."
      });
    } else {
      res.send({
        message: `No se pudo actualizar la area con el ID: ${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error actualizando la area con el ID: " + id
    });
  });
};

exports.delete =(req, res) => {
  const id = req.params.id;
  models.area.destroy({where: {id: id}})
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Area eliminada correctamente."
      });
    } else {
      res.send({
        message: `No se pudo eliminar la area con el ID: ${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error eliminando la area con el ID: " + id
    });
  });
};
