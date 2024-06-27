const express = require('express');
const router = express.Router();

lista_usuarios = [
    {nombre:"Marco", id:"34", password:"dell"}, 
    {nombre:"Johana", id:"7655", password:"locura"}, 
    {nombre:"Martin", id:"80085", password:"node"}]

//Rutas

router.get("/",(req,res)=>{
    res.send(lista_usuarios);
})
router.get("/:id", (req, res) => {
    const id = (req.params.id);
    const usuario=lista_usuarios.filter((usuario)=> nombre.id===id)
    res.send(usuario);
})
module.exports = router;