// Nous avons besoin d'importer le module express pour utiliser le Router
const express = require('express');
// Nous créons un objet router qui va nous permettre de gérer les routes
const router = express.Router();    
const mysql = require('mysql');
const db = require("../../apiPokemon/.src/config/db.js");

router.get('/tous', (req, res) => {
    const query = 'SELECT * FROM pokemon ORDER BY id';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Erreur lors de la récupération des pokémons :', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            // Convertir les résultats en une chaîne de caractères avec un retour à la ligne entre chaque entrée
            const formattedResult = result.map(pokemon => JSON.stringify(pokemon, null, 2)).join('<br> <br>');

            // Renvoyer la chaîne formatée
            res.send(formattedResult);
        }
    });
});

router.get('/:id', (req, res) => {
    const pokemonId = req.params.id;
    const query = `SELECT * FROM pokemon WHERE id = ${pokemonId}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error(`Erreur lors de la récupération du Pokémon avec l'ID ${pokemonId} :`, err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: `Aucun Pokémon trouvé avec l'ID ${pokemonId}` });
            } else {
                // Convertir le résultat en une chaîne de caractères avec une mise en forme
                const formattedResult = JSON.stringify(result[0], null, 2);

                // Renvoyer la chaîne formatée
                res.send(formattedResult);
            }
        }
    });
});


router.get('/type/:type', (req, res) => {
    const pokemonType = req.params.type;
    const query = `SELECT * FROM pokemon WHERE type_primaire = '${pokemonType}'`;

    db.query(query, (err, result) => {
        if (err) {
            console.error(`Erreur lors de la récupération des Pokémon de type ${pokemonType} :`, err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            if (result.length === 0) {
                res.status(404).json({ error: `Aucun Pokémon trouvé de type ${pokemonType}` });
            } else {
                // Convertir les résultats en une chaîne de caractères avec un retour à la ligne entre chaque entrée
                const formattedResult = result.map(pokemon => JSON.stringify(pokemon, null, 2)).join('<br> <br>');

                // Renvoyer la chaîne formatée
                res.send(formattedResult);
            }
        }
    });
});
// On exporte le router pour pouvoir l'utiliser dans index.js
module.exports = router;
