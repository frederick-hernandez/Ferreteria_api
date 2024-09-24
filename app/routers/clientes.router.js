const router = require('express').Router();

const clientes = require('../controllers/clientes.controller.js');


router.post('/cliente/create', clientes.create);
router.get('/cliente/findall', clientes.findAll);
router.get('/cliente/findbyid/:id', clientes.findbyid);
router.put('/cliente/update/:id', clientes.update);
router.put('/cliente/status/:id', clientes.darBaja);

//Telfonos
router.get('/cliente/tel/:telefono/:cliente_id', clientes.selectTel);
router.post('/cliente/InsertTel', clientes.createTel);
router.put('/cliente/updateTel', clientes.editTel);
router.delete('/cliente/DeleteTel', clientes.deleteTel);

//Direcciones
router.post('/cliente/insertDire', clientes.insertDire);
router.put('/cliente/editDire', clientes.editDire);
module.exports = router;