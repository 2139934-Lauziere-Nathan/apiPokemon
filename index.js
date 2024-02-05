console.log("test");
const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const app = express();
const PORT = 3000;

console.log("test");

const db = require("../apiPokemon/.src/config/db.js");

const morgan = require('morgan')

app.use(morgan('dev')); // format prédifini, voir dans la doc


app.get('/', (req, res) => {
    res.send("<p>qqchose</p>");
});

app.get('/tous', (req, res) => {
    res.send("<p>de quoi dautre</p>");
});


app.use('/api/pokemon', require('./routes/route.js'));

app.listen(PORT, () => {
    console.log("Serveur démarré sur le port ${PORT}");
}); 