const promiseQuery = require('../config/db')

// Importamos modelo de Producto
const Usuarios = require('../models/Users')

// Controlador de productos

const obtenerTodos = async (req, res) => {
  // Obtiene todos los usuarios de la base de datos
  try {
    const productos = await Usuarios.findAll()
    return res.json(productos)
  } catch (error) {
    return res.json({err: error})
  }
}

const obtener = async (req, res) => {
  try {
    const { id } = req.params
    const producto = await Usuarios.findByPk(id)
  
    return res.status(200).json(producto) 
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const crear = async (req, res) => {
  try {
    const { nombre, precio, stock } = req.params

    // Validaciones
    if (!nombre || nombre.length < 3) {
      return res.status(401).json({error: "Nombre inválido"})
    }
    if (!precio || isNaN(precio)) {
      return res.status(401).json({error: "Precio inválido"})
    }
    if (isNaN(stock)) {
      return res.status(401).json({error: "Stock inválido"})
    }

    const productoNuevo = await Usuarios.create({ 
      nombre: nombre, precio: precio, stock: stock 
    });
    productoNuevo.save();

    return res.status(200).json({
      message: "Producto creado!",
      data: productoNuevo
    })

  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const actualizar = async (req, res) => {
  try {
    const {nombre, precio, stock} = req.body
    const query = "UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?"
    
    await promiseQuery(query, [nombre, precio, stock, req.params.id])
    res.json({message: "Producto actualizado exitosamente"})
  } catch (error) {
    throw error
  }
}

const borrar = async (req, res) => {
  try {
    const query = "DELETE FROM productos WHERE id = ?"

    await promiseQuery(query, [req.params.id])
    res.json({message: "Producto borrado"})
  } catch (error) {
    throw error
  }
}

module.exports = {
  obtenerTodos,
  obtener,
  crear,
  actualizar,
  borrar
}