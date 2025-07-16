// middleware/authorizeWithScopes.js
import db from '../models/index.js'; // Assurez-vous d'importer vos modèles

export const authorizeWithScopes = (requiredPermission, scopeContext = null) => {
    return async (req, res, next) => {
        // 1. Vérification de l'authentification (supposons que req.user est déjà populé)
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Authentification requise.' });
        }

        try {
            // 2. Récupérer les rôles et permissions de l'utilisateur
            const user = await db.User.findByPk(req.user.id, {
                include: {
                    model: db.Role,
                    include: {
                        model: db.Permission,
                        attributes: ['nom_permission'] // Nom de la permission (ex: 'document.modifier')
                    }
                }
            });

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }

            const userPermissions = new Set();
            user.Roles.forEach(role => {
                role.Permissions.forEach(permission => {
                    userPermissions.add(permission.nom_permission);
                });
            });

            // 3. Vérifier si l'utilisateur a la permission de base
            if (!userPermissions.has(requiredPermission)) {
                return res.status(403).json({ message: 'Accès refusé : Permissions insuffisantes.' });
            }

            // 4. Vérifier les exigences de scope (si définies pour cette permission)
            const scopeRequirements = PERMISSION_SCOPE_REQUIREMENTS[requiredPermission];

            if (scopeRequirements) {
                if (scopeRequirements.requires && scopeRequirements.requires !== scopeContext) {
                    // Si un scope spécifique est requis et ne correspond pas au contexte actuel
                    return res.status(403).json({ message: `Accès refusé : Le scope "${scopeRequirements.requires}" est requis.` });
                }

                if (scopeRequirements.requiresOneOf && !scopeRequirements.requiresOneOf.includes(scopeContext)) {
                    // Si un des scopes est requis et le contexte actuel n'en fait pas partie
                    return res.status(403).json({ message: `Accès refusé : Un des scopes suivants est requis : ${scopeRequirements.requiresOneOf.join(', ')}.` });
                }
            }

            // Si tout est bon, continuer
            next();

        } catch (error) {
            console.error('Erreur d\'autorisation avec scopes :', error);
            res.status(500).json({ message: 'Erreur interne du serveur lors de l\'autorisation.' });
        }
    };
};

// Exemple d'utilisation dans les routes
// routes/documentRoutes.js
import express from 'express';
import {
    getDocuments,
    updateDocument,
    deleteDocument
} from '../controllers/documentController.js';
import { authenticate } from '../middleware/authenticate.js'; // Votre middleware d'authentification
import { authorizeWithScopes } from '../middleware/authorizeWithScopes.js';

const router = express.Router();

// Récupérer des documents (peu importe le statut)
router.get('/', authenticate, authorizeWithScopes('document.lire'), getDocuments);

// Modifier un document : L'ID du document est dans req.params.id
// Dans updateDocument, vous devrez déterminer le statut du document (brouillon, publié, etc.)
// et appeler authorizeWithScopes avec le scope approprié.
// Une approche plus dynamique serait de passer le statut comme un paramètre au middleware:
router.put('/:id', authenticate, async (req, res, next) => {
    // Supposons que vous récupérez le document ici pour connaître son statut
    const documentId = req.params.id;
    const document = await db.Document.findByPk(documentId); // Assurez-vous d'avoir un modèle Document

    if (!document) {
        return res.status(404).json({ message: 'Document non trouvé.' });
    }

    let scopeRequired = null;
    if (document.statut === 'brouillon') {
        scopeRequired = 'document:statut:brouillon';
    } else if (document.statut === 'publie') {
        scopeRequired = 'document:statut:publie';
    }
    // Ajoutez d'autres conditions de statut si nécessaire

    // Appelez le middleware authorizeWithScopes avec la permission et le scope dynamique
    authorizeWithScopes('document.modifier', scopeRequired)(req, res, next);
}, updateDocument);


// Supprimer un document archivé
router.delete('/:id', authenticate, async (req, res, next) => {
    const documentId = req.params.id;
    const document = await db.Document.findByPk(documentId);

    if (!document) {
        return res.status(404).json({ message: 'Document non trouvé.' });
    }

    let scopeRequired = null;
    if (document.statut === 'archive') {
        scopeRequired = 'document:statut:archive';
    }

    authorizeWithScopes('document.supprimer', scopeRequired)(req, res, next);
}, deleteDocument);

export default router;