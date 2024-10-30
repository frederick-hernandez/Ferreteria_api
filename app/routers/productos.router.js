const router = require('express').Router();


const productos = require('../controllers/productos.controller.js');

router.get('/productos/findall',productos.findall);
router.post('/productos/create',productos.create);
router.put('/productos/update/:id', productos.update);
router.delete('/productos/delete/:id', productos.delete);
router.get('/productos/findbyid/:id', productos.findById);
router.get('/productos/findP', productos.findP)
module.exports = router;