import hashlib
#encriptado
contraseña=input("Ingrese la contraseña: ")
encriptado=hashlib.sha256(contraseña.encode())
print(encriptado.hexdigest())
#manipulación de strings
username=input("Ingrese el nombre completo")
names=username.split()
user=f"{names[0][0]}{names[0][1]} {names[1]}"
print(user)