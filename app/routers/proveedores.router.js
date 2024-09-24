const router = require('express').Router();

const prove = require('../controllers/proveedores.controller.js');


router.get('/proveedores/findall', prove.findAll);

module.exports = router;