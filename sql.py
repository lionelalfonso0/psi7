import mysql.connector
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="usuarios"
)
#crear db (si no está creada, saquen la linea 6 porque si la quieren crear con el cursor les va a tirar error)
dataBase="CREATE DATABASE usuarios"
#crear tabla
table="CREATE TABLE tarea(correo varchar(15),username varchar(15),password varchar(15))" 
#ingresar valores a la tabla
ingresar="insert into tarea(correo,username,password) values ('marco@gmail.com','marco','locura')"
#mostrar valores
seleccionar="select * from tarea"
#cursor para ejecutar las instrucciones
mycursor = mydb.cursor()
mycursor.execute()

#for x in mycursor: <----Estos son para que si hay un describe o select imprima lo que devuelva
#    print(x)