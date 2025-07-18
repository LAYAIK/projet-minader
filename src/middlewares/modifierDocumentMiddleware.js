import authorizeWithScopes from './authorizationWithScopes.js';
import db from '../models/index.js';

const modifierDocumentMiddleware = async (req, res, next) => {
    // Cette fonction anonyme est un middleware qui s'exécute AVANT 'authorizeWithScopes' et 'updateDocument'.
    // Elle est 'async' car elle interagit avec la base de données.

    const documentId = req.params.id; // Récupère l'ID du document depuis l'URL
    const document = await db.Document.findByPk(documentId); // Récupère le document pour connaître son statut

    if (!document) {
        return res.status(404).json({ message: 'Document non trouvé.' });
    }

    let scopeRequired = null; // Initialise le scope requis à null
    if (document.statut === 'brouillon') {
        scopeRequired = 'document:statut:brouillon'; // Si c'est un brouillon, ce scope est le contexte
    } else if (document.statut === 'publie') {
        scopeRequired = 'document:statut:publie'; // Si c'est publié, ce scope est le contexte
    }
    // Vous pouvez ajouter d'autres conditions pour d'autres statuts ou propriétés du document

    // Appelle le middleware 'authorizeWithScopes' avec :
    // - la permission de base : 'document.modifier'
    // - le scope contextuel déterminé dynamiquement : 'scopeRequired'
    // Le '.next()' est implicite ici, car 'authorizeWithScopes' appellera lui-même 'next()' si l'autorisation réussit.
    authorizeWithScopes('document.modifier', scopeRequired)(req, res, next);
};

export default modifierDocumentMiddleware;