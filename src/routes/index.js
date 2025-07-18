// import AuthApiRoute from "./AuthRoute.js";
import roleRoutes from "./roleRoute.js";
import courierRoutes from "./courierRoute.js";
import structureRoutes from "./structureRoute.js";
import documentRoutes from "./documentRoute.js";
import typeDocumentRoutes from "./typeDocumentRoute.js";
import permissionRoutes from "./permissionRoute.js";
import prioriteRoutes from "./prioriteRoute.js";
import objetRoutes from "./objetRoute.js";
import TypeCourrierRoutes from "./typeCourrierRoute.js";
import archiveRoutes from "./archiveRoute.js";
import utilisateurRoutes from "./utilisateurRoute.js";
import statusRoutes from "./statusRoute.js";
import utilisateurRoleRoutes from "./utilisateurRoleRoute.js";
import rolePermissionRoutes from "./rolePermissionRoute.js";
import CourrierUtilisateurRoutes from "./courrierUtilisateurRoute.js";
import transiterRoutes from "./transiterRoute.js";
import noteRoutes from "./noteRoute.js";

// import rapportRoutes from "./rapportRoute.js";
import personnelRoutes from "./personnelRoute.js";
// import messagerieRoutes from "./messagerieRoute.js"; // Import des routes de messagerie
import uploadRoutes from "./uploadRoute.js";


const ApiRoutes = (app) => {
    // app.use(AuthApiRoute); // Route pour l'authentification
    app.use(roleRoutes);
    app.use(courierRoutes); // Route pour les courriers
    app.use(structureRoutes);
    app.use(documentRoutes);
    app.use(typeDocumentRoutes);
    app.use(permissionRoutes);
    app.use(prioriteRoutes);
    app.use(objetRoutes);
    app.use(TypeCourrierRoutes);
    app.use(archiveRoutes); // Route pour les archives
    app.use(utilisateurRoutes); // Route pour les utilisateurs
    app.use(statusRoutes);
    app.use(utilisateurRoleRoutes);
    app.use(rolePermissionRoutes);
    app.use(CourrierUtilisateurRoutes);
    app.use(transiterRoutes);
    app.use(noteRoutes);
    // app.use(rapportRoutes); // Route pour les rapports
    app.use(personnelRoutes); // Route pour le personnel
    // app.use('/api/messagerie',messagerieRoutes); // Route pour la messagerie

    app.use(uploadRoutes);
};
export default ApiRoutes