const express = require('express');
const router = new express.Router();
var op = require('../operation')
var moment = require('moment');


/* GET users listing. */
router.get('/ListeRestaurants', (req, res) => {
    res.render('ListeRestaurantEmp', { ListeRestos: op.GetAll() })
})

router.get('/ListeCommandeNonPreparee/:IdResto', (req, res) => {
    res.render('ListeCommandeNonPreparee', {
        IdResto: req.params.IdResto,
        ListeCommandeNonPreparee: op.GetListeCommandeNonPreparee(req.params.IdResto),
        NombreCommandeAPreparer: op.NombreCommandeAPreparer(req.params.IdResto),
        NombreCommandePreparerNonEnleve: op.NombreCommandePreparerNonEnleve(req.params.IdResto),
        NombreCommandeDejaEnleve: op.NombreCommandeDejaEnleve(req.params.IdResto),
        DelaiMoyenPreparation: op.DelaiMoyenPreparation(req.params.IdResto),
        DateEtHeureDerniereMiseAjour: '',moment: moment

    })
})

router.post('/refreshListeCommandeNonPreparee', (req, res) => {
    IdResto = req.body.id
    res.end(JSON.stringify({
        ListeCommandeNonPreparee: op.GetListeCommandeNonPreparee(IdResto),
        NombreCommandeAPreparer: op.NombreCommandeAPreparer(IdResto),
        NombreCommandePreparerNonEnleve: op.NombreCommandePreparerNonEnleve(IdResto),
        NombreCommandeDejaEnleve: op.NombreCommandeDejaEnleve(IdResto),
        DelaiMoyenPreparation: op.DelaiMoyenPreparation(IdResto),
        DateEtHeureDerniereMiseAjour: ''
        
    }))
})

router.get('/ConnectEmploye', (req, res) => {
    res.render('Connexion')
})
router.post('/CommandePrete', (req, res) => {
    IdCmd = req.body.IdCommand
    res.end(op.MarkCommandCommePret(IdCmd))
})
module.exports = router;
