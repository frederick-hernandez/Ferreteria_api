const router = require('express').Router();

const area = require('../controllers/area.controller.js');

router.get('/areas/findall', area.findAll);  //si
router.post('/areas/create', area.create); // si
router.put('/areas/update/:id', area.update); // si
router.delete('/areas/delete/:id', area.delete); // si
router.get('/areas/findbyid/:id', area.findById); //si
module.exports = router;