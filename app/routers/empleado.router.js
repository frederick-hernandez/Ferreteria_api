const router = require('express').Router();

const empleados = require('../controllers/empleados.controller.js');

router.get('/empleado', (req, res) => {
    res.send('Welcome to router!')
})


router.get('/empleado/findAll', empleados.findAll); // si

router.post('/empleado/create', empleados.create);//si

router.get('/empleado/findbyid/:id', empleados.findById);// si

router.put('/empleado/update/:id', empleados.update);// si

router.delete('/empleado/delete/:id', empleados.delete);//si
router.put('/empleado/status/:id', empleados.status);//si

module.exports = router;