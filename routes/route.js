const express = require('express');
const router = express.Router();    
const controller = require('../controlleur/controlleur');
//creation de la route pour tout afficher
router.get('/tous', controller.getAllPokemons);
//creation de la route pour delete un pokemon
router.delete('/:id', controller.delete);
//creation de la route pour update un pokemon
router.put('/:id', controller.put);
//creation de la route pour ajouter un pokemon
router.post('/', controller.post);
//creation de la route pour rechercher un pokemon par son id
router.get('/:id', controller.get);
//creation de la route pour rechercher des pokemon par type
router.get('/type/:type', controller.getByType);

module.exports = router;
