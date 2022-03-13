const express = require('express');
const errorHandler = require('./app/middlewares/errorHandler');
const routes = require('./routes');
const cors = require('./app/middlewares/cors');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(3001, () => {
  console.log('server started at http://localhost:3001');
});
