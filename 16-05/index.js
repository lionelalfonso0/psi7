const express=require('express');
const app=express();
const port=3000;

lista_usuarios = [
    {nombre: "Marco", id:"34", password:"dell"}, 
    {nombre:"Johana", id:"7655", password:"locura"}, 
    {nombre:"Martin", id:"8008135", password:"nodemon"}
]
//Inicio (log in y sign up)
app.get("/",(request,response)=>{
    response.sendFile("F:/pdi/intento en clase/inicio.html");
});
//Inicio
app.get("/home",(req,res)=>{
    res.sendFile("F:/pdi/intento en clase/home.html");
})
//buscar tabla por comerciante
app.get("/comerciante",(req,res)=>{
    const name=req.query.username;
    const usuario =lista_usuarios.filter(usuario => usuario.nombre == name);
    res.send(usuario);
})

app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`)
})