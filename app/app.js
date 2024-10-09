const express = require('express')
const routeremp = require('./routers/empleado.router.js')
const routerArea = require('./routers/area.router.js')
const routerCliente = require('./routers/clientes.router.js')
const routerproveedores = require('./routers/proveedores.router.js')
const routerpcabecera = require('./routers/pcabecera.router.js')
const routerproductos = require('./routers/productos.router.js')
const cors = require('cors');
const app = express();
app.get('/', (req, res) => {
    res.send('Welcome home')
})


app.use(cors());
app.use(express.json());
app.use('/api/v1',routeremp);
app.use('/api/v2',routerArea);
app.use('/api/v3',routerCliente);
app.use('/api/v4',routerproveedores);
app.use('/api/v5',routerpcabecera);
app.use('/api/v6',routerproductos);
module.exports = app
