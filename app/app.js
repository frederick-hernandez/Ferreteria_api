const stripe = require('stripe')('sk_test_51Q9AEA09aSD3bY6NBMCNdBYSwazvtVaL2iywZArY76L6G5fltckNBdhBvptwXbEs1WCznD8CdENrHG1EuYwlNCnJ00wWyKHCgQ');
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

const YOUR_DOMAIN = 'http://localhost:3000'
app.use(cors());
app.use(express.json());
app.use('/api/v1',routeremp);
app.use('/api/v2',routerArea);
app.use('/api/v3',routerCliente);
app.use('/api/v4',routerproveedores);
app.use('/api/v5',routerpcabecera);
app.use('/api/v6',routerproductos);


app.post('/checkout', async (req, res) => {
    const items = req.body.items.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: [item.image]
          },
          unit_amount: item.price * 100,
        },
        quantity: item.qty
      }
    });
  
    const session = await stripe.checkout.sessions.create({
      line_items: [...items],
      mode: 'payment',
      success_url:'http://localhost:4200/products',
      cancel_url: `${YOUR_DOMAIN}/app/cancel.html`,
    });
  
    res.status(200).json(session);
  });
  
  app.get('/session-status', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  
    res.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
  });
  
module.exports = app
