const mysql = require('mysql');
const { promisify } = require(`util`);

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "mercado",
  connectionLimit: 10, // Limita el número de conexiones simultáneas
})

const promiseQuery = promisify(db.query).bind(db)

db.getConnection((err, connection) => {
  if (err) throw err

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
})

module.exports = promiseQuery