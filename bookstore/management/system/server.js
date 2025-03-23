// server.js

// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT || 5432,
});

pool.connect((err, client, done) => {
    if (err) {
        console.error('Error conectando a la base de datos: ', err);
        return;
    }
    console.log('Conectado a la base de datos PostgreSQL');
});

app.get('/api/books', (req, res) => {
    pool.query('SELECT * FROM books', (err, results) => {
        if (err) {
            console.error('Error al obtener libros:', err);
            res.status(500).json({ error: 'Error en el servidor' });
        } else {
            const booksWithFullImagePath = results.rows.map(book => ({
                ...book,
                cover_image: `http://localhost:${port}/public/${book.cover_image}`
            }));
            res.json(booksWithFullImagePath);
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});