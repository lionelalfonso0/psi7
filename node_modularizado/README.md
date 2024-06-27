# NodeJS

NodeJS es un entorno de ejecución de JavaScript que permite ejecutar código JavaScript en el servidor.

Nosotros vamos a estar utilizando NodeJS para crear APIs con la ayuda del framework Express

### Instalación

Para instalar NodeJS, siga los siguientes pasos:

1. Descarga la última versión de NodeJS de la página oficial: https://nodejs.org/en/download/.
2. Ejecuta el instalador y sigue las instrucciones para instalar NodeJS en tu sistema.
3. Verifica que NodeJS se ha instalado correctamente ejecutando el comando `node -v` y `npm -v`.

### Creación de un proyecto NodeJS 

1. Crea un directorio para tu proyecto y entra en él.
2. Accede a la terminal o CMD en el directorio creado, o bien abre el visual sobre esa carpeta y ejecuta el comando `npm init -y`.
3. Ejecuta el comando `npm install express` para instalar el framework Express.
4. Crea un archivo llamado `index.js` y agrega el siguiente código:


```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hola muy buenas');
});

app.listen(3000, () => {
  console.log('Mi aplicacion esta funcionando en el puerto 3000!');
})
```
5. Ejecuta el comando `node index` para iniciar el servidor.
6. Accede a `http://localhost:3000` en tu navegador para ver el resultado.

**Nota:** Pueden instalar nodemon (`npm install nodemon`) y ejecutar `nodemon index` para que la aplicación se reinicie automáticamente cuando se haga cambios en el código.

### Rutas

Las rutas son las direcciones que se utilizan para acceder a los recursos de tu aplicación. En NodeJS, las rutas se definen utilizando el módulo `express.Router()`.

Para definir una ruta en un archivo separado deberemos crear una carpeta (ej: "rutas") y dentro de la misma un archivo .js que describa de qué tipo de rutas estamos hablando.

```
proyecto
|-- rutas
|   |-- productos.js
|-- index.js
```

Dentro de cada archivo de rutas, debes crear un objeto `express.Router()` y luego utilizar el método `router.get()` o `router.post()` para definir la ruta y la función de respuesta. Por ejemplo:

```javascript
  const express = require('express');
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send('Listado de productos');
  });

  router.post('/', (req, res) => {
    // Procesar el cuerpo de la solicitud
    res.send('Producto añadido');
  });

  module.exports = router;
```

Para utilizar las rutas en tu aplicación principal, debes importar el módulo `express.Router()` y luego utilizar el método `app.use()` para registrar las rutas en tu aplicación. Por ejemplo:

```javascript
  const express = require('express');
  const app = express();
  
  // Se definen los routers
  const productosRouter = require('./rutas/productos');

  app.use('/productos', productosRouter);
  app.get('/', (req, res) => {
    res.send('Hola muy buenas');
  });

  app.listen(3000, () => {
  console.log('Mi aplicacion esta funcionando en el puerto 3000!');
})
```

Si iniciamos la aplicacion y nos dirigimos a `http://localhost:3000/productos`, veremos el resultado de la ruta `GET /productos`.

### Bases de Datos

Para incluir una conexión a bases de datos MySQL en NodeJS, vamos a tener que usar la libreria mysql (`npm install mysql`).

Deberemos conectarnos a la base de datos MySQL. Para eso crearemos un archivo nuevo, `config/db.js` en este caso.

```
proyecto
|-- config
|   |-- db.js
|-- rutas
|   |-- productos.js
|-- index.js
```

Dentro de este nuevo archivo nos interesa definir la conexión a la base de datos

```js
const mysql = require(`mysql`)
const { promisify } = require(`util`) // Vamos a tratar los llamados como 'promesas'

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ecommerce',
  connectionLimit: 10, // Limita el número de conexiones simultáneas
})

const promiseQuery = promisify(db.query).bind(db) // Creamos un 'cursor' que va a permitirnos manejar las queries como 'promesas'

db.getConnection((err, connection) => {
  if (err) {
    throw err
  } else {
    console.log('Conexión exitosa')
    
    // Creamos las tablas si es que no existen
    connection.query(
      `CREATE TABLE IF NOT EXISTS productos (
        id INT NOT NULL AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        precio INT NOT NULL,
        stock INT NOT NULL,
        PRIMARY KEY (id)
      )`
    )

    connection.query(
      `CREATE TABLE IF NOT EXISTS...`
    )
  }
})

module.exports = promiseQuery
```

Luego deberemos usar este archivo en nuestro index.js para poder establecer una conexión

```javascript
  const express = require('express');
  const app = express();
  
  // Conectamos a la DB
  const conn = require('./config/db');
  
  // Se definen los routers
  const productosRouter = require('./rutas/productos');

  app.use('/productos', productosRouter);
  app.get('/', (req, res) => {
    res.send('Hola muy buenas');
  });

  app.listen(3000, () => {
  console.log('Mi aplicacion esta funcionando en el puerto 3000!');
})
```

### Rutas con bases de Datos

Ahora vamos a modificar el archivo `rutas/productos.js` en este caso.

```
proyecto
|-- config
|   |-- db.js
|-- rutas
|   |-- productos.js
|-- index.js
```

Dentro de este archivo vamos a modificar los endpoints.

```js
const express = require('express');
const router = express.Router();
const promiseQuery = require('../config/db')

router.get('/', async (req, res) => {
  try {
    const query = "SELECT * FROM `productos`"

    const productos =  await promiseQuery(query)
    res.json(productos)
  } catch (err) {
    throw err
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const query = "SELECT * FROM `productos` WHERE id = ?"

    const producto =  await promiseQuery(query, [id])
    res.json(producto)
  } catch (err) {
    throw err
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body

    const query = "INSERT INTO `productos` (nombre, precio, stock) VALUES (?, ?, ?)"

    const producto =  await promiseQuery(query, [nombre, precio, stock])
    res.json(producto)
  } catch (err) {
    throw err
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { nombre, precio, stock } = req.body

    const query = "UPDATE `productos` SET nombre = ?, precio = ?, stock = ? WHERE id = ?"

    const producto =  await promiseQuery(query, [nombre, precio, stock, id])
    res.json(producto)
  } catch (err) {
    throw err
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const query = "DELETE FROM `productos` WHERE id = ?"

    const producto =  await promiseQuery(query, [id])
    res.json(producto)
} catch (err) {
    throw err
  }
});

module.exports = router
```

**Nota:** Para este punto, es muy posible que las solicitudes no funcionen correctamente. Para eso deberiamos instalar bodyParser (para manejar req.body) y cors (para manejar las solicitudes de otros dominios. Tambien deberiamos incluirlos en nuestro archivo index.js
  
```
npm install body-parser cors
```

```js
// index.js
// ...
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// ...
```

### Controladores

Los controladores son funciones que se encargan de manejar la lógica de la aplicación.

Por ejemplo, si tenemos un endpoint para obtener un producto por su id, entonces el controlador debería ser capaz de obtener ese producto de la base de datos.

```js
const promiseQuery = require('../config/db')

// Controlador de productos

const obtenerTodos = async (req, res) => {
  // Obtiene todos los usuarios de la base de datos
  try {
    const query = "SELECT * FROM productos";

    const productos =  await promiseQuery(query)
    res.json(productos)
  } catch (error) {
    throw err
  }
}

module.exports = {
  obtenerTodos
}
```

De esta manera, separamos la logica de la dirección, quedandonos las rutas de la siguiente manera


```js
const express = require('express');
const router = express.Router();
const productosController = require('../controladores/productosController')

router.get('/', productosController.obtenerTodos)

module.exports = router
```