    /**
     *  npm init : pour initialiser un projet node
     * npm install express : pour installer le package express
     * npm install --save-dev nodemon : pour installer le package nodemon en tant que dependance de developpement
     * createServer : pour demarrer un serveur node basique avec le package http
     *  process.env.PORT : pour recuperer le port de l'environnement de l'aplli 
     * server.listen : pour demarrer le serveur sur un port specifique 
     * Nodemon est un package qui mettra à jour votre serveur démarré à chaque changement de fichier 
     *  
     */
       
    const http = require ('http'); //
    const app = require('./app'); // on importe l'application express
    
    
     // Ajouter la normalisation de port, la gestion d'erreur et du logging basique à votre serveur Node le rend plus constant et plus facile à déboguer.
    const normalizePort = val => {
        const port = parseInt(val, 10); // parseInt : pour convertir la chaine de caractere en entier 
    
        // si le port est un nombre
        if (isNaN(port)){
            return val; // on retoutne le port tel quel 
        }
    
        // si le port est un nombre positif
        if (port >= 0){
            return port; // on retourne le port 
        }
    
        return false; // sinon on retourne false
    
    };
    
    const port = normalizePort(process.env.PORT || '3000'); // on recupere le port de l'environnement de l'appli ou on utilise le port 3000
    
    app.set('port', port); // on definit le port de l'appli
    
    
    const errorHandler = error => {
        // si l'erreur est un instance de error 
        if (error.syscall !== "listen"){
            throw error;   //on lance l'errerur 
        }
    
    
    const address = server.address(); // on recupere l'adresse du serveur
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port; // on definit le port ou l'adresse du serveur
    
    switch (error.code){
        case 'EACCES': // si l'erreur est eacces
            console.error(bind + ' requires elevated privileges.');// on affiche un message d'erreur
            process.exit(1); // on quitte le processus
            break;
        case 'EADDRINUSE': // si l'erreur est eaddrinuse
            console.error(bind + ' is already in use.'); // on affiche un message d'erreur
            process.exit(1); // on quitte le processus
            break;  
        default:
            throw error; // on lance l'erreur
        }
    };
    
    const server = http.createServer(app);
    
    server.on('error', errorHandler); // on gere les erreurs du serveur
    server.on('listening', () => { // on gere l'evenement d'ecoute du serveur
        const address = server.address(); // on recupere l'adresse du serveur
        const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port; // on definit le port ou l'adresse du serveur
        console.log('Listening on ' + bind); // on affiche un message de succes
    });
    
    
    server.listen(port); // on demarre le serveur sur le port definit
    