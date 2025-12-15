import validator from 'validator';
import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
const app = express();
app.use(cors());
app.use(express.json());
// --- BASE DE DATOS EN MEMORIA ---
const db = new sqlite3.Database(':memory:');

db.serialize(() => {

    db.run("CREATE TABLE users (id INT, email TEXT, password TEXT)");

    // Creamos el admin.

    db.run("INSERT INTO users VALUES (1, 'admin@escuela.com', 'SuperSecreto2025')");

});

// 1. Regex ReDoS aquí, NUNCA lo pongáis en código real

const EMAIL_REGEX = /^([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+$/;
// 2. Regex Débil: Sólo permite letras/números...ya os podéis imaginar el error

const PASS_REGEX = /^[a-zA-Z0-9]+$/;
app.get('/', (req, res) => {
    res.status(200).send('Servidor API OK.');
});

// --- ENDPOINT LOGIN ---
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Validación Robusta
    if (!validator.isEmail(email)) {

        // CORRECCIÓN XSS: No devolvemos el input del usuario en el error, o lo

        escapamos.

        return res.status(400).send("El formato del correo no es válido.");

    }

    // Vulnerabilidad XSS Reflejado:Sobra la explicación, la conocéis.

    if (!EMAIL_REGEX.test(email)) {
        return res.status(400).send(`Error: El email <b>${email}</b> no es válido.`);
    }

    // Comprobación débil
    if (!PASS_REGEX.test(password)) {
        return res.status(400).send("Contraseña con caracteres inválidos.");
    }

    // VULNERABILIDAD CRÍTICA: SQL INJECTION

    const query = `SELECT * FROM users WHERE email = ? AND password = ?`; console.log(`[SQL EJECUTADO]: ${query}`); // Así vemos el ataque en consola

    db.get(query, [email, password], (err, row) => {
        if (err) return res.status(500).json({ error: "Error en BD" });

        if (row) {
            res.json({ message: ` ACCESO CONCEDIDO. Bienvenido ID: ${row.id}` });
        } else {
            res.status(401).json({ error: "Credenciales incorrectas" });
        }
    });
});

app.listen(3000, () => console.log(' Server listo en puerto 3000'));