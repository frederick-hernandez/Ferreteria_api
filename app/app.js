const express = require('express')
const routeremp = require('./routers/empleado.router.js')
const routerArea = require('./routers/area.router.js')
const routerCliente = require('./routers/clientes.router.js')
const routerproveedores = require('./routers/proveedores.router.js')
const routerpcabecera = require('./routers/pcabecera.router.js')
const cors = require('cors');
app.use(cors());
const app = express();
app.get('/', (req, res) => {
    res.send('Welcome home')
})

const corsOptions = {
  origin: 'https://ferreteria-api.onrender.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/v1',routeremp);
app.use('/api/v2',routerArea);
app.use('/api/v3',routerCliente);
app.use('/api/v4',routerproveedores);
app.use('/api/v5',routerpcabecera);
module.exports = app
