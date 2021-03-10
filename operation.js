function construct_func() {
    let ListeRestaurants = require('./restaurants.json')
    let ListeCommande = []
    let Etat = {
        CREE: 0,
        PREPAREE: 1,
        ENLEVEE: 2,
        LIVREE: 3,
        ANNULEE: 4
    }
    return {
        EtatCommande: Etat,
        GetById: (id) => {
            for (var item of ListeRestaurants) {
                if (item.id == id) {
                    return item
                }
            }
            return {}
        },
        GenerateIdCommand: () => {
            let IdCommand = 0;
            for (var item of ListeCommande) {
                if (IdCommand <= item.IdCommand) {
                    IdCommand = item.IdCommand
                }
            }

            return Number(IdCommand) + 1;
        },
        GetAll: () => {
            return ListeRestaurants;
        },
        AddCommand: (Commande) => {
            if (ListeCommande.push(Commande)) {
                return '1';
            }
            return '0';
        },
        GetListeCommandeNonPreparee: (idResto) => {
            let Liste = [];
            for (var item of ListeCommande) {
                if (item.Resto.id == idResto) {
                    if (item.Etat == Etat.CREE) {
                        Liste.push(item)
                    }
                }
            }
            return Liste
        },
        GetListeCommandeALivrer: (nomLivreur) => {
            let Liste = [];
            for (var item of ListeCommande) {
                if (item.Etat == Etat.ENLEVEE && item.Livreur == nomLivreur) {
                    Liste.push(item)
                }
            }
            return Liste
        },
        NombreCommandeAPreparer: (idResto) => {
            let nbre = 0;
            for (var item of ListeCommande) {
                if (item.Resto.id == idResto) {
                    if (item.Etat == Etat.CREE) {
                        nbre += 1

                    }
                }
            }
            return nbre
        },
        NombreCommandePreparerNonEnleve: (idResto) => {
            let nbre = 0;
            for (var item of ListeCommande) {
                if (item.Resto.id == idResto) {
                    if (item.Etat == Etat.PREPAREE) {
                        nbre += 1
                    }
                }
            }
            return nbre
        },
        NombreCommandeDejaEnleve: (idResto) => {
            let nbre = 0;
            for (var item of ListeCommande) {
                if (item.Resto.id == idResto) {
                    if (item.Etat == Etat.ENLEVEE) {
                        nbre += 1
                    }
                }
            }
            return nbre
        },
        DelaiMoyenPreparation: (idResto) => {
            let nbre = 0;
            let DiffDate = 0;
            for (var item of ListeCommande) {
                if (item.Resto.id == idResto) {
                    if (item.Etat != Etat.CREE) {
                        let d1 = item.DatePrepare.getTime();
                        let d2 = new Date(item.Date).getTime();
                        DiffDate += ((d1 - d2) / (1000 * 60 * 60)) // pour avoir la différence en heure
                        nbre += 1
                    }
                }
            }
            return (nbre == 0) ? 0 : (DiffDate / nbre).toFixed(2)
        },
        MarkCommandCommePret: (Id) => {
            console.log("--MarkCommandCommePret IdCommand", Id)

            for (var item of ListeCommande) {
                if (item.IdCommand == Id) {
                    item.Etat = Etat.PREPAREE
                    item.DatePrepare = new Date()
                }
            }
            console.log(ListeCommande);
            return '1';
        },
        ListeRestaurantAvecNbreCommandPret: () => {
            for (var item of ListeRestaurants) {
                let NbreCommand = 0
                for (var Command of ListeCommande) {
                    if (Command.Resto.id == item.id) {
                        if (Command.Etat == Etat.PREPAREE) {
                            NbreCommand += 1
                        }
                    }
                }
                item.CommandePreparee = NbreCommand
            }
            return ListeRestaurants
        },
        EnleverCommande: (IdCommand, Livreur) => {
            console.log("--Enlevement IdCommand", IdCommand)
            let Exist = false;
            for (var item of ListeCommande) {
                if (Number(item.IdCommand) == Number(IdCommand)) {
                    item.Etat = Etat.ENLEVEE
                    item.DateEnlevement = new Date()
                    item.Livreur = Livreur
                    Exist = true;
                }
            }
            console.log(ListeCommande);
            return Exist;
        },
        ConfirmerLivraison: (IdCommand) => {
            console.log("--Livraison IdCommand", IdCommand)
            let Exist = false;
            for (var item of ListeCommande) {
                console.log("--Livraison Boucle " + item.IdCommand, (Number(item.IdCommand) == Number(IdCommand)))

                if (Number(item.IdCommand) == Number(IdCommand)) {
                    item.Etat = Etat.LIVREE
                    item.DateLivraison = new Date()
                    Exist = true;
                }
            }
            console.log(ListeCommande);
            return Exist;
        },
        GetAllListeDesCommandes: () => {
            return ListeCommande;
        }, NombreCommandeEnCours: () => {
            let nbre = 0;
            for (var item of ListeCommande) {
                if (item.Etat == Etat.CREE) {
                    nbre++;
                }
            }
            return nbre;
        }, NombreCommandeEnAttenteDenlevement: () => {
            let nbre = 0;
            for (var item of ListeCommande) {
                if (item.Etat == Etat.PREPAREE) {
                    nbre++;
                }
            }
            return nbre;
        }, NombreCommandeCollecte: () => {
            let nbre = 0;
            for (var item of ListeCommande) {
                if (item.Etat == Etat.ENLEVEE) {
                    nbre++;
                }
            }
            return nbre;
        }, NombreCommandeDelivre: () => {
            let nbre = 0;
            for (var item of ListeCommande) {
                if (item.Etat == Etat.LIVREE) {
                    nbre++;
                }
            }
            return nbre;
        }, 
        AnnulerCommande: (IdCommand) => {
            let Exist = false;
            for (var item of ListeCommande) {
                if (Number(item.IdCommand) == Number(IdCommand)) {
                    item.Etat = Etat.ANNULEE
                    item.DateAnnulation = new Date()
                    Exist = true;
                }
            }
            return Exist;
        }, 
        ViderPileCommande: () => {
            return ListeCommande = [];
        }
    }
}
var op = new construct_func()
module.exports = op;