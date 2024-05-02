import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd=""
  databases="lionell"
)

mycursor = mydb.cursor()
mycursor.execute("CREATE TABLES IF NOT EXISTS usuario()")