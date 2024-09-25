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