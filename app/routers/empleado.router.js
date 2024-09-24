const router = require('express').Router();

const empleados = require('../controllers/empleados.controller.js');

router.get('/empleado', (req, res) => {
    res.send('Welcome to router!')
})


router.get('/empleado/findAll', empleados.findAll);

router.post('/empleado/create', empleados.create);

router.get('/empleado/findbyid/:id', empleados.findById);

router.put('/empleado/update/:id', empleados.update);

router.delete('/empleado/delete/:id', empleados.delete);
router.put('/empleado/status/:id', empleados.status);

module.exports = router;