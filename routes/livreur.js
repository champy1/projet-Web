const express = require('express');
const router = new express.Router();
var op = require('../operation')
var moment = require('moment');

/* GET users listing. */
router.post('/connexion-livreur', (req, res) => {
    let liv = req.body;
    console.log(liv)
    res.render('ListeRestaurantLivreur', { Livreur: liv, ListeRestos: op.ListeRestaurantAvecNbreCommandPret() })
})
router.get('/ConnexionLivreur', (req, res) => {
    res.render('ConnexionLivreur', { ListeRestos: op.GetAll() })
})
router.get('/RetirerCommande/:IdResto/:Livreur', (req, res) => {
    res.render('RetirerCommande', { Resto: op.GetById(req.params.IdResto), Livreur: JSON.parse(req.params.Livreur) })
})
router.get('/liste_commande_a_livrer/:Livreur', (req, res) => {
    let nomLivreur = JSON.parse(req.params.Livreur).Nom + ' ' + JSON.parse(req.params.Livreur).Prenom
    res.render('ListeCommandeALivrer', { ListeCommandeALivrer: op.GetListeCommandeALivrer(nomLivreur), Livreur: JSON.parse(req.params.Livreur),moment: moment })
})

router.post('/CommandeLivree', (req, res) => {
    let IdCommand = req.body.IdCommand
    if (op.ConfirmerLivraison(IdCommand)) {
        res.end('1')
    } else {
        res.end('0')
    }
})
router.post('/enlever_commande', (req, res) => {
    let IdCommand = req.body.IdCommand
    let Livreur = req.body.Livreur
    if (op.EnleverCommande(IdCommand, Livreur)) {
        res.end('1')
    } else {
        res.end('0')
    }
})
module.exports = router;
