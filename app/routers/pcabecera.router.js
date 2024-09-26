const router = require('express').Router();

const pedidos_cabecera = require('../controllers/pcabecera.controller.js');


router.get('/pcabecera/findall', pedidos_cabecera.findAll);

module.exports = router;