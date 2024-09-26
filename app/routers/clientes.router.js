const router = require('express').Router();

const clientes = require('../controllers/clientes.controller.js');


router.post('/cliente/create', clientes.create);   //si
router.get('/cliente/findall', clientes.findAll); //si
router.get('/cliente/findbyid/:id', clientes.findbyid); //si
router.put('/cliente/update/:id', clientes.update); //si
router.put('/cliente/status/:id', clientes.darBaja); // si

//Telfonos
router.get('/cliente/tel/:cliente_id', clientes.selectTel); // si
router.post('/cliente/InsertTel', clientes.createTel); // si
router.put('/cliente/updateTel', clientes.editTel); // si
router.delete('/cliente/DeleteTel', clientes.deleteTel);// si

//Direcciones
router.post('/cliente/insertDire', clientes.insertDire); //si
router.put('/cliente/editDire', clientes.editDire);// si
router.get('/cliente/selectDire/:cliente_id', clientes.selectDire); //si
router.delete('/cliente/deleteDire', clientes.deleteDire); //si

module.exports = router;