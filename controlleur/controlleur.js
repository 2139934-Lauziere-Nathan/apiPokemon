const mysql = require('mysql');
const db = require("../../apiPokemon/.src/config/db.js");

const controller = {
    //fonction pour recupere tout les pokemon de la base de donne
    getAllPokemons: (req, res) => {
        //commande Sql pour tout recupere dans la table pokemon et ordoner par le id
        const query = 'SELECT * FROM pokemon ORDER BY id';
        //execute la commande
        db.query(query, (err, result) => {
            if (err) {
                //lance une erreure
                console.error('Erreur lors de la recuperation des pokemons :', err);
                res.status(500).json({ error: 'Erreur serveur' });
            } else {
                //map le resulta de pokemon et stringify le resultat, ajout de deux breakline pour la visibiliter
                const formattedResult = result.map(pokemon => JSON.stringify(pokemon, null, 2)).join('<br> <br>');

                res.send(formattedResult);
            }
        });
    },
    
    delete: (req, res) => {
        //recuper le id de la requete
        const pokemonId = req.params.id;
        //cree une requete sql qui delete un pokemon base sur son id
        const query = `DELETE FROM pokemon WHERE id = ${pokemonId}`;
        //execute la requete sql
        db.query(query, (err, result) => {
            if (err) {
                //lancement d'erreur
                console.error(`Erreur lors de la suppression du pokemon avec l'ID ${pokemonId} :`, err);
                res.status(500).json({ error: 'Erreur serveur' });
            } else {

                if (result.affectedRows === 0) {
                    //aucun pokemon trouver
                    res.status(404).json({ error: `Aucun pokemon trouve avec l'ID ${pokemonId}` });
                } else {
                    //success
                    res.status(200).json({ message: `Pokemon avec l'ID ${pokemonId} supprime avec succes` });
                }
            }
        });
    },
    
    put: (req, res) => {
        //recuper le id par le parametre
        const pokemonId = req.params.id;
        //recuper le nom, type_primaire, type_secondaire, pv, attaque, defense des parametre de la requete
        const { nom, type_primaire, type_secondaire, pv, attaque, defense } = req.body;
        //cree une function sql pour update un pokemon 
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
            //array de valeur a insere
        const values = [nom, type_primaire, type_secondaire, pv, attaque, defense, pokemonId];
        //execution de la requere sql
        db.query(query, values, (err, result) => {
            if (err) {
                //erreur lors de la requete
                console.error(`erreur lors de la mise a jour du pokemon avec l'ID ${pokemonId} :`, err);
                res.status(500).json({ error: 'Erreur serveur' });
            } else {
                if (result.affectedRows === 0) {
                    //aucun pokemon trouver
                    res.status(404).json({ error: `aucun pokemon trouve avec l'ID ${pokemonId}` });
                } else {
                    //mise a jour avec succes
                    res.status(200).json({ message: `Pokemon avec l'ID ${pokemonId} mis à jour avec succes` });
                }
            }
        });
    },
    
    post: (req, res) => {
        //recupere les variable du request body
        const { nom, type_primaire, type_secondaire } = req.body;
        //cree la requete sql pour ajouter un pokemon
        const query = `INSERT INTO pokemon (nom, type_primaire, type_secondaire) VALUES (?, ?, ?)`;
        //array de valeur a insere
        const values = [nom, type_primaire, type_secondaire];
        //execution de la requete sql
        db.query(query, values, (err, result) => {
            if (err) {
                //erreur lors de l'execution de la requete sql
                console.error('Erreur lors de l\'ajout du Pokémon :', err);
                res.status(500).json({ error: 'Erreur serveur' });
            } else {
                //succes
                res.status(201).json({ message: 'pokemon ajoute avec succes', pokemonId: result.insertId });
            }
        });
    },
    
    get: (req, res) => {
        //recuper le id par les parametre de la requete
        const pokemonId = req.params.id;
        //cree une requete sql qui selectctione un pokemon avec un id specifique
        const query = `SELECT * FROM pokemon WHERE id = ${pokemonId}`;
        //execution de la requete sql
        db.query(query, (err, result) => {
            if (err) {
                //erreu lors de l'execution de la requete sql
                console.error(`Erreur lors de la recuperation du pokemon avec l'ID ${pokemonId} :`, err);
                res.status(500).json({ error: 'Erreur serveur' });
            } else {
                if (result.length === 0) {
                    //id du pokemon introuvable
                    res.status(404).json({ error: `aucun pokemon trouve avec l'ID ${pokemonId}` });
                } else {
                    //formate le resulta avec stringify
                    const formattedResult = JSON.stringify(result[0], null, 2);
                    //envoie le resultas de la requete sql
                    res.send(formattedResult);
                }
            }
        });
    },
    
    getByType: (req, res) => {
        //recupere le type a recherche dans les parametre de la requete
        const pokemonType = req.params.type;
        //cree une requete sql qui selectionne tous les pokemon d'un certain type
        const query = `SELECT * FROM pokemon WHERE type_primaire = '${pokemonType}'`;
        //execute la requete sql
        db.query(query, (err, result) => {
            if (err) {
                //lancement d'une ereure si il y a eu un probleme avec le sql
                console.error(`erreur lors de la recuperation des pokemon de type ${pokemonType} :`, err);
                res.status(500).json({ error: 'Erreur serveur' });
            } else {
                if (result.length === 0) {
                    //aucun pokemon avec l'id demander trouver
                    res.status(404).json({ error: `Aucun pokemon trouve de type ${pokemonType}` });
                } else {
                    //formate le resulta de la requete avec map et stringify, ajout de deux breakline pour la visibiliter
                    const formattedResult = result.map(pokemon => JSON.stringify(pokemon, null, 2)).join('<br> <br>');
                    //envoie le resulta
                    res.send(formattedResult);
                }
            }
        });
    }
};

module.exports = controller;
