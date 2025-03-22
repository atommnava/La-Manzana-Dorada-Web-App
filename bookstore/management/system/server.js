const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();

// Solo una declaración de 'port'
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});

db.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos: ', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.get('/api/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            console.error('Error al obtener libros:', err);
            res.status(500).json({ error: 'Error en el servidor' });
        } else {
            const booksWithFullImagePath = results.map(book => ({
                ...book,
                cover_image: `https://la-manzana-dorada-web-app.onrender.com/public/${book.cover_image}`
            }));
            res.json(booksWithFullImagePath);
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});