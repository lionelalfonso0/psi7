const promiseQuery = require('../config/db');
const regExPassword=/^[0-9a-f]{64}$/i;
const regExEmail=/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
// Importamos modelo de Producto
const Producto = require('../models/Users')

// Controlador de productos

const obtenerTodos = async (req, res) => {
  // Obtiene todos los usuarios de la base de datos
  try {
    const productos = await Producto.findAll()
    return res.json(productos)
  } catch (error) {
    return res.json({err: error})
  }
}

const obtener = async (req, res) => {
  try {
    const { id } = req.params
    const producto = await Producto.findByPk(id)
  
    return res.status(200).json(producto) 
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const crear = async (req, res) => {
  try {
    const {nombre, apellido, gmail, contraseña } = req.params

    // Validaciones
    if (!nombre || nombre.length < 4) {
      return res.status(401).json({error: "Nombre inválido"})
    }
    if (!apellido || apellido.length < 4) {
      return res.status(401).json({error: "apellido inválido"})
    }
    if (!contraseña || regExPassword.test(contraseña)) {
      return res.status(401).json({error: "formato de contraseña inválido"})
    }
    if (!gmail || regExEmail.test(gmail)) {
      return res.status(401).json({error: "format de correo inválido"})
    }
    const productoNuevo = await Producto.create({ 
      nombre: nombre, apellido: apellido, gmail: gmail, contraseña:contraseña 
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
    const {id}=req.params
    const {nombre, apellido, email} = req.body
    const query = "UPDATE productos SET nombre = ?, apellido = ?, email = ? WHERE id = ?"
    
    await promiseQuery(query, [id, nombre, apellido, email, req.params.id])
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