const express = require('express');
const app = express();
// Conectamos a la DB
const mysqlConnection = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use('/', require('./rutas/productos'))
app.put('/usuarios', require('./rutas/productos'))
app.listen(3000, () => {
  console.log('Mi aplicacion esta funcionando en el puerto 3000!');
})