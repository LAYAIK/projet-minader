import  {sequelize, connectDB}  from './src/config/db.js'; // Notez l'extension .js
import 'dotenv/config'; // Charge les variables d'environnement depuis le fichier .env
import app from './app.js';
import * as models from "./src/models/index.js"; // Importez tous les modèles


const PORT = process.env.PORT || 3000;

// Votre fonction pour lancer la connexion à la base de données
async function runApplication() {
    await connectDB();

    try {
        await sequelize.sync({ force: false }); // Utilisez force: false pour ne pas supprimer les données existantes
        console.log("Modèles synchronisés avec la base de données.");

    } catch (error) {
        console.error("Erreur lors de la synchronisation des modèles ou des opérations:", error);
    }

    app.listen(PORT, () => {
        console.log(`Le serveur est démarré sur le port ${PORT}`);
    });
}

runApplication();