const router = require('express').Router();

const prove = require('../controllers/proveedores.controller.js');


router.get('/proveedores/findall', prove.findAll);//si
router.get('/proveedores/findbyid/:id', prove.findOne);//si
router.post('/proveedores/create', prove.create);//si
router.put('/proveedores/update/:id', prove.update);//si
router.delete('/proveedores/delete/:id', prove.delete);//si
module.exports = router;