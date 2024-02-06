const express = require('express');
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
            const formattedResult = result.map(pokemon => JSON.stringify(pokemon, null, 2)).join('<br> <br>');

            res.send(formattedResult);
        }
    });
});
router.delete('/:id', (req, res) => {
    const pokemonId = req.params.id;
    const query = `DELETE FROM pokemon WHERE id = ${pokemonId}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error(`Erreur lors de la suppression du Pokémon avec l'ID ${pokemonId} :`, err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ error: `Aucun Pokémon trouvé avec l'ID ${pokemonId}` });
            } else {
                res.status(200).json({ message: `Pokémon avec l'ID ${pokemonId} supprimé avec succès` });
            }
        }
    });
});
router.put('/:id', (req, res) => {
    const pokemonId = req.params.id;
    const { nom, type_primaire, type_secondaire, pv, attaque, defense } = req.body;
    const query = `
        UPDATE pokemon 
        SET 
            nom = ?, 
            type_primaire = ?, 
            type_secondaire = ?, 
            pv = ?, 
            attaque = ?, 
            defense = ? 
        WHERE id = ?`;
    const values = [nom, type_primaire, type_secondaire, pv, attaque, defense, pokemonId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(`Erreur lors de la mise à jour du Pokémon avec l'ID ${pokemonId} :`, err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({ error: `Aucun Pokémon trouvé avec l'ID ${pokemonId}` });
            } else {
                res.status(200).json({ message: `Pokémon avec l'ID ${pokemonId} mis à jour avec succès` });
            }
        }
    });
});
router.post('/ajouter', (req, res) => {
    const { nom, type_primaire, type_secondaire } = req.body;
    const query = `INSERT INTO pokemon (nom, type_primaire, type_secondaire) VALUES (?, ?, ?)`;
    const values = [nom, type_primaire, type_secondaire];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'ajout du Pokémon :', err);
            res.status(500).json({ error: 'Erreur serveur' });
        } else {
            res.status(201).json({ message: 'Pokémon ajouté avec succès', pokemonId: result.insertId });
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
                const formattedResult = JSON.stringify(result[0], null, 2);

                res.send(formattedResult);
            }
        }
    });
});


router.get('/type/:type', (req, res) => {65
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
                const formattedResult = result.map(pokemon => JSON.stringify(pokemon, null, 2)).join('<br> <br>');

                res.send(formattedResult);
            }
        }
    });
});
// On exporte le router pour pouvoir l'utiliser dans index.js
module.exports = router;
