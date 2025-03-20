/* Importación de modulos
 * express: framework para crear el servidor
 * mysql2: Cliente para conectarse a MySQL
 * cors: Middleware que permite que el front end acceda al backend sin resgricciones de origen
 */
// http://localhost:3000/api/books
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const path = require('path');

/* Configuración de aplicación
 * app inicializa una instancia de Express, que es el servidor web
 * port define el puerto en el que correra el servidor (3000)
 */
const app = express();
const port = 3000;


/* Uso de Middlewares
 * app.use(cors()) Habilita CORS permitiendo que el frontend haga peticiones al backend
 * app.use(express.json()) Permite recibir datos en formato JSON en las solicitudes HTTP
 */
app.use(cors());
app.use(express.json());
// Hacer accesible la carpeta public
app.use('/public', express.static('public'));

/* Configuración de la conexión a MySQL
 * localhost -> MySQL está corriendo en la misma maquina
 * user: 'root' -> Nombre de usuario para acceder a MySQL.
 * password: '' Contraseña
 * database. Base de datos a la que nos conectamos
 */
const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '12345678',
    database: 'bookstore'
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos: ', err);
        return;
    }
    console.log('Conectando a la base de datos MySQL');
});

/* Definición de la ruta para obtener los Libros
 * Creamos una API REST que responde a solicitudes GET en /api/books
 * db.query('SELECT * FROM books', (err, results) => {...}):
 * Ejecuta la consulta SQL para obtener todos los libros.
 * Si hay un error, responde con un codigo 500 (Error en el servidor)
 * Si la consulta es exitosa, envia los libros en formato JSON al frontend
 */
app.get('/api/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            console.error('Error al obtener libros:', err);
            res.status(500).json({ error: 'Error en el servidor' });
        } else {
            // Agregar la URL completa de la imagen
            const booksWithFullImagePath = results.map(book => ({
                ...book,
                cover_image: `http://localhost:${port}/public/${book.cover_image}`
            }));
            res.json(booksWithFullImagePath);
        }
    });
});

/* Arrancamos el servidor
 * app.listen(port, () => {...}) inicia el servidor en el puerto 3000.
 * Muestra en la terminal: "Servidor corriendo en http://localhost:3000".
 */
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


