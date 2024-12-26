/**
 * ***************************mongoDB Atlas********************************
 *                  npm install mongodb
 *                 npm install mongoose
 * user: Edells
 * password: edellsoffset
 * 
 * mongodb+srv://Edells:<db_password>@cluster0.9o4vh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
 * 
//const mongoose = require('mongodb'); // on importe le package mongodb
 * 
 * 
 * ***********************************************************************
 * Le framework Express est installé et enregistré dans le  package.json  avec   npm install express  
 * 
 * Pour créer une application Express, appelez simplement la méthode  express()
 * 
 * Un middleware est un bloc de code qui traite les requêtes et réponses d'une application.
 * 
 * la methode app.use() permet d'attribuer un middleware a une route specifique d'une application express
 * 
 * La méthode  res.setHeader()  permet de définir les en-têtes de réponse pour les requêtes.
 * 
 * La méthode  res.status()  permet de définir le code de statut de la réponse HTTP.
 * 
 * le cross-origin resource sharing (cros) definit comment les serveurs et les navigateurs interagissent entre eux, 
 * en specifiant quelles ressurces peuvent etre demandées de maniere legitime - par defaut, les requetes ajax sont interdites
 * 
 * find()  permet de trouver tous les documents qui respectent les critères de recherche spécifiés.
 * findOne()  permet de trouver un seul document qui respecte les critères de recherche spécifiés. 
 * save()  permet d'enregistrer un document dans la base de données.
 * updateOne()  permet de mettre à jour un seul document dans la base de données.
 * deleteOne()  permet de supprimer un seul document de la base de données.
 */
const express = require('express'); // on importe le package express
const bodyParser = require('body-parser'); // on importe le package body-parser
const mongoose = require('mongoose'); // on importe le package mongoose

//const Produit = require('./model/produit'); // on importe le modele produit
const Produit = require('./model/produit'); // on importe le modele produit
// on se connecte a la base de donnees mongoDB
mongoose.connect('mongodb+srv://Edells:edellsoffset@cluster0.9o4vh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
    { useNewUrlParser: true,
      useUnifiedTopology: true }) // on se connecte a la base de donnees mongoDB
    .then(() => console.log('Connexion à MongoDB réussie !')) // si la connexion est reussie on affiche un message de confirmation
    .catch(() => console.log('Connexion à MongoDB échouée !')); // sinon on affiche un message d'erreur

const app = express(); // on cree une application express


//middleware pour éviter les erreurs CORS cross-origin resource sharing
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // permet l'accès à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // ajoute les headers mentionnés aux requêtes envoyées vers l'API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // envoie des requêtes avec les méthodes mentionnées
    // Répondre aux requêtes préliminaires `OPTIONS` directement
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use(bodyParser.json()); // middleware pour transformer le corps de la requête en objet JSON utilisable
//app.use(express.json()); // middleware pour transformer le corps de la requête en objet JSON utilisable



app.post('/api/products', (req, res, next) => { // route pour creer un produit
    console.log(req.body);
    delete req.body._id; // on supprime l'id du corps de la requete
    const produit = new Produit({ // on cree un nouveau produit
        ...req.body
    });
    produit.save() // on enregistre le produit
       /*.then(() => {
        console.log('Produit enregistré avec succès !');
        res.status(201).json({ message: 'Objet enregistré !'}); // si le produit est enregistre on affiche un message de confirmation
       })
        .catch(error => {
            res.status(400).json({ error }); // si une erreur survient on affiche un message d'erreur
        });*/
        .then( produit => res.status(201).json({ produit})) // si le produit est enregistre on affiche un message de confirmation
        .catch(error => res.status(400).json({ error })); // si une erreur survient on affiche un message d'erreur
});



app.put('/api/products/:id', (req, res, next) => { // route pour modifier un produit
    Produit.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // on modifie un produit
        .then(() => res.status(200).json({ message: 'Objet modifié !'})) // si le produit est modifie on affiche un message de confirmation
        .catch(error => res.status(400).json({ error })); // si une erreur survient on affiche un message d'erreur
}   );  

app.delete('/api/products/:id', (req, res, next) => { // route pour supprimer un produit
    Produit.deleteOne({ _id: req.params.id }) // on supprime un produit
        .then(() => res.status(200).json({ message: 'Objet supprimé !'})) // si le produit est supprime on affiche un message de confirmation
        .catch(error => res.status(400).json({ error })); // si une erreur survient on affiche un message d'erreur
}   );

app.get('/api/products', (req, res, next) => { // route pour recuperer tous les produits
    Produit.find()
    .then(produits => res.status(200).json(produits)) // on recupere tous les produits
    .catch(error => res.status(400).json({ error })); // si une erreur survient on affiche un message d'erreur
});

app.get('/api/products/:id', (req, res, next) => { // route pour recuperer un produit
    Produit.findOne({ _id: req.params.id })
        .then(produit => res.status(200).json(produit)) // on recupere un produit
        .catch(error => res.status(404).json({ error })); // si une erreur survient on affiche un message d'erreur
});




module.exports = app; // on exporte l'application express