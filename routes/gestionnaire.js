const express = require('express');
const router = new express.Router();
var op = require('../operation')
var moment = require('moment');

/* GET users listing. */
router.get('/Gestionnaire', (req, res) => {
    res.render('ListeCommandePlateforme', {
        ListeDesCommandes: op.GetAllListeDesCommandes(),
        NombreCommandeEnCours: op.NombreCommandeEnCours(),
        NombreCommandeEnAttenteDenlevement: op.NombreCommandeEnAttenteDenlevement(),
        NombreCommandeCollecte: op.NombreCommandeCollecte(),
        NombreCommandeDelivre: op.NombreCommandeDelivre(),moment: moment
    })
})
router.get('/vider_pile_commande', (req, res) => {
     
    res.render('ViderPileCommande')
})
router.post('/ViderPile', (req, res) => {
    if (op.ViderPileCommande()) {
        res.end('1')
    } else {
        res.end('0')
    }
    
    res.render('ViderPileCommande')
})
router.post('/refreshGestionnaire', (req, res) => {
    res.end(JSON.stringify({
        ListeDesCommandes: op.GetAllListeDesCommandes(),
        NombreCommandeEnCours: op.NombreCommandeEnCours(),
        NombreCommandeEnAttenteDenlevement: op.NombreCommandeEnAttenteDenlevement(),
        NombreCommandeCollecte: op.NombreCommandeCollecte(),
        NombreCommandeDelivre: op.NombreCommandeDelivre()
    }))
})


router.post('/AnnulerCommande', (req, res) => {
    let IdCommand = req.body.IdCommand
    if (op.AnnulerCommande(IdCommand)) {
        res.end('1')
    } else {
        res.end('0')
    }
})
module.exports = router;
