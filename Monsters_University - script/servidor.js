const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configura la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost', // Cambia esto si tu servidor es diferente
    user: 'root', // Cambia esto a tu usuario
    password: 'admin', // Cambia esto a tu contraseña
    database: 'biblioteca'
});

// Conecta a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos.');
});

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'biblioteca.html'));
});

// Ruta para obtener los libros
app.get('/api/libros', (req, res) => {
    const sql = 'SELECT * FROM libros';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
