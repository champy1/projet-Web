const express = require('express');
const router = new express.Router();
var op = require('../operation')
var moment = require('moment');



router.get('', (req, res) => {
    res.render('Index', { ListeRestos: op.GetAll() })
})
router.get('/Home', (req, res) => {
    res.render('Home', { ListeRestos: op.GetAll() })
})
router.get('/commande/:IdResto', (req, res) => {
    res.render('Commande', { Resto: op.GetById(req.params.IdResto) })
})
router.post('/valider_commande', (req, res) => {
    let cmd = req.body;
    cmd.IdCommand = op.GenerateIdCommand()
    cmd.Date = new Date()
    cmd.Resto = op.GetById(req.body.Resto)
    cmd.Etat = op.EtatCommande.CREE
    console.log(cmd)
    res.render('DetailCommande', { Commande: cmd,moment: moment })
})

router.post('/confirmer_commande', (req, res) => {
    res.end(op.AddCommand(req.body))
})
module.exports = router;
