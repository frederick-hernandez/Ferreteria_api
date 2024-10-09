const router = require('express').Router();

const pedidos_cabecera = require('../controllers/pcabecera.controller.js');


router.get('/pcabecera/findall', pedidos_cabecera.findAll);
router.post('/pcabecera/create', pedidos_cabecera.create);
router.put('/pcabecera/update/:id', pedidos_cabecera.update);
router.delete('/pcabecera/delete/:id', pedidos_cabecera.delete);

router.post('/cuerpo/create', pedidos_cabecera.createC);



module.exports = router;