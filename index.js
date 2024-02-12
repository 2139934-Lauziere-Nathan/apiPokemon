
const express = require('express');
const mysql = require('mysql');
const app = express();
const PORT = 3000;
app.use(express.json());



//connecter la base de donne
const db = require("../apiPokemon/.src/config/db.js");
//initier swagger-ui
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../apiPokemon/.src/config/documentation.json');
const swaggerOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Demo API"
};
//initialiser morgan
const morgan = require('morgan')

app.use(morgan('dev')); 
// creation d'un "root"
app.get('/', (req, res) => {
    res.send("<p>index</p>");
});

//creation de la route pour acceder a la docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
//route de base pour le reste des route
app.use('/api/pokemon', require('./routes/route.js'));
//garde le serveur ouvert
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
}); 
