const app = require('./app/app.js');
const { sequelize } = require('./app/config/db.config.js');

const port = process.env.PORT ||3000;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err) => {
  console.error('Error connecting to the database:', err);
});
module.exports = app;