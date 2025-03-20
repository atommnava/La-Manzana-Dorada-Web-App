# La-Manzana-Dorada-Web-App

La conexión para la base de datos es un poco más compleja de lo esperado, deberás verificar que los paquetes
necesarios esten instalados (express, mysql y cors). Node.js puede que no encuetre express debido a que no este en
tu carpeta, lo que puede causar el error "Cannot find module express".

Al instalar los paquetes con:
npm install express mysql2 cors

Esto permite que Node.js encuentre y cargue correctamente las dependencias, permitiendo que el servidor funcione


Para ejecutar el servidor utiliza:
node [archivo_servidor.js]
NOTA: Para detener el servidor, presiona:
CTRL + C
Esto lo detendra inmediantamente.