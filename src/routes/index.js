import AuthApiRoute from "./AuthRoute.js";
import roleRoutes from "./roleRoute.js";
import courierRoutes from "./courierRoute.js";
import archiveRoutes from "./archiveRoute.js";
import utilisateurRoute from "./utilisateurRoute.js";
import rapportRoutes from "./rapportRoute.js";
import personnelRoutes from "./personnelRoute.js";
import messagerieRoutes from "./messagerieRoute.js"; // Import des routes de messagerie



const AuthApiRoutes = (app) => {
    app.use(AuthApiRoute); // Route pour l'authentification
    app.use(roleRoutes);
    app.use(courierRoutes); // Route pour les courriers
    app.use(archiveRoutes); // Route pour les archives
    app.use(utilisateurRoute); // Route pour les utilisateurs
    app.use(rapportRoutes); // Route pour les rapports
    app.use(personnelRoutes); // Route pour le personnel
    app.use('/api/messagerie',messagerieRoutes); // Route pour la messagerie
};

export default AuthApiRoutes