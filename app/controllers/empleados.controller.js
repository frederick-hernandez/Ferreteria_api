const {models} = require('../config/db.config');


exports.create = async (req, res) => {
  try {
    let empleados = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      area_id: req.body.area_id,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      email: req.body.email,
      salario: req.body.salario,
    }
    let newEmpleado = await models.empleados.create(empleados);
    res.status(201).send({
      message: "Empleado creado correctamente.",
      empleado: newEmpleado,
    });
    } catch (error) {
      res.status(500).send({
        message: "Error creando empleado: " + error.message,
      });
    }
};

exports.findAll = async(req,res,next)=>{
  try {
      const Emple = await models.empleados.findAll({include:{model:models.area, as: "area"}})
      res.send({
        Empleados: Emple
      });
  }   catch (error) {
        res.status(500).send({
             message:
              error.message || "Error al recuperar clientes."
      });
  }
};

exports.findById =(req, res) => {
    models.empleados.findOne({
      where : { id:req.params.id},
      include:{model:models.area, as: "area"}
    }
    )
   .then(data => {
     if (!data) {
       res.status(404).send({
         message: "No se encontró empleado con el ID: " + req.params.id
       });
       return;
     }
     res.send({
      Empleado : data
    });
    })
   .catch(err => {
     if (err.kind === 'not_found') {
       res.status(404).send({
         message: "No se encontró empleado con el ID: " + req.params.id
       });
     } else {
       res.status(500).send({
         message: "Error recuperando el empleado con el ID: " + req.params.id
       });
     }
    });
};

exports.update = (req, res) => {
  const { nombre,apellido,direccion,telefono,salario,email,area_id,status} = req.body;
  if (!req.body) {
    return res.status(400).send({
      message: "El cuerpo de la solicitud no puede estar vacío"
    });
  }
  models.empleados.update(req.body, {
    where: { id: req.params.id }
  })
   .then(num => {
     if (num == 1) {
       res.send({
         message: "Empleado actualizado correctamente."
       });
     } else {
       res.send({
         message: `No se pudo actualizar el empleado con el ID: ${req.params.id}. No se encontró ningún empleado.`
       });
     }
   })
   .catch(err => {
     res.status(500).send({
       message: "Error actualizando el empleado con el ID: " + req.params.id
     });
   });
}

exports.delete = (req, res) => {
  models.empleados.destroy({
    where: { id: req.params.id }
  })
   .then(num => {
      if (num == 1) {
        res.send({
          message: "Empleado eliminado correctamente."
        });
      } else {
        res.send({
          message: `No se pudo eliminar el empleado con el ID: ${req.params.id}. No se encontró ningún empleado.`
        });
      }
    })
   .catch(err => {
      res.status(500).send({
        message: "Error eliminando el empleado con el ID: " + req.params.id
      });
    });
};

exports.status = (req, res) => {
  models.empleados.update({ status: req.body.status }, {
    where: { id: req.params.id }
  })
   .then(num => {
      if (num == 1) {
        res.send({
          message: "Empleado actualizado correctamente."
        });
      } else {
        res.send({
          message: `No se pudo actualizar el empleado con el ID: ${req.params.id}. No se encontró ningún empleado.`
        });
      }
    })
   .catch(err => {
      res.status(500).send({
        message: "Error actualizando el empleado con el ID: " + req.params.id
      });
    });
};

