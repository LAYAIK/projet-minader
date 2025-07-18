// middleware/authorizeWithScopes.js
import db from '../models/index.js'; // Importe l'objet 'db' qui contient tous vos modèles Sequelize

// PERMISSION_SCOPE_REQUIREMENTS doit être défini quelque part (par exemple, dans un fichier de configuration ou au-dessus de ce middleware)
// C'est un objet qui mappe une permission à ses exigences de scope spécifiques.
const PERMISSION_SCOPE_REQUIREMENTS = {
    'document.modifier': { // La permission de modifier un document
        requiresOneOf: ['document:statut:brouillon', 'document:statut:publie'] // Nécessite un de ces scopes
    },
    'document.supprimer': { // La permission de supprimer un document
        requires: 'document:statut:archive' // Nécessite ce scope spécifique
    },
    'document.lire': { // La permission de lire un document
        // Par exemple, lire peut accéder à tout, mais on peut affiner
        // Ou on peut avoir une logique "dynamique" basée sur le document lui seul
    },
    'utilisateur:profil:base': { // La permission de lire le profil de base d'un utilisateur
        requires: 'utilisateur:profil:base' // Nécessite ce scope spécifique
    },
    'utilisateur:profil:complet': { // La permission de lire le profil complet d'un utilisateur
        requires: 'utilisateur:profil:complet' // Nécessite ce scope spécifique
    }

    // Ajoutez d'autres permissions et leurs exigences de scope ici
};

const authorizeWithScopes = (requiredPermission, scopeContext = null) => {
    // Cette fonction retourne le middleware Express réel.
    // 'requiredPermission' est la permission de base nécessaire (ex: 'document.lire').
    // 'scopeContext' est le scope spécifique au contexte de la requête (ex: 'document:statut:brouillon').
    return async (req, res, next) => {
        // --- Étape 1 : Vérification de l'authentification ---
        // Cette étape suppose qu'un middleware d'authentification (comme 'authenticate' dans vos routes)
        // a déjà été exécuté et a attaché les informations de l'utilisateur authentifié à 'req.user'.
        if (!req.user || !req.user.id) {
            // Si l'utilisateur n'est pas authentifié ou si ses informations sont manquantes,
            // la requête est rejetée avec un statut 401 (Non autorisé).
            return res.status(401).json({ message: 'Authentification requise.' });
        }

        try {
            // --- Étape 2 : Récupérer les rôles et permissions de l'utilisateur ---
            // Le code interroge la base de données pour récupérer l'utilisateur
            // en incluant (joignant) ses Rôles, et pour chaque Rôle, en incluant ses Permissions.
            // Cela permet d'obtenir toutes les permissions que l'utilisateur possède via ses rôles.
            const user = await db.Utilisateur.findByPk(req.user.id_utilisateur, {
                include: {
                    model: db.Role, // Inclut le modèle Role
                    include: {
                        model: db.Permission, // Inclut le modèle Permission associé à chaque Role
                        attributes: ['nom'] // Ne récupère que le nom de la permission (ex: 'document.modifier')
                    }
                }
            });
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé.' });
            }

            // Collecte toutes les permissions uniques que l'utilisateur possède
            // en parcourant ses rôles et les permissions associées à chaque rôle.
            const userPermissions = new Set(); // Utilisation d'un Set pour stocker des permissions uniques
            user.Roles.forEach(role => {
                // Assurez-vous que 'Permissions' est l'alias correct de l'association dans votre modèle Role
                // (comme discuté précédemment, il pourrait être 'associatedPermissions')
                role.Permissions.forEach(permission => {
                    userPermissions.add(permission.nom);
                });
            });

            // --- Étape 3 : Vérifier si l'utilisateur a la permission de base ---
            // Le middleware vérifie si l'ensemble des permissions de l'utilisateur contient
            // la 'requiredPermission' passée en paramètre (ex: 'document.modifier').
            if (!userPermissions.has(requiredPermission)) {
                // Si la permission de base est manquante, l'accès est refusé avec un statut 403 (Interdit).
                return res.status(403).json({ message: 'Accès refusé : Permissions insuffisantes.' });
            }

            // --- Étape 4 : Vérifier les exigences de scope (si définies pour cette permission) ---
            // Cette partie ajoute la granularité des scopes.
            // Elle cherche si la 'requiredPermission' a des exigences de scope définies dans 'PERMISSION_SCOPE_REQUIREMENTS'.
            const scopeRequirements = PERMISSION_SCOPE_REQUIREMENTS[requiredPermission];

            if (scopeRequirements) { // Si des exigences de scope existent pour cette permission
                // Vérification du scope 'requires' (un scope unique et obligatoire)
                if (scopeRequirements.requires && scopeRequirements.requires !== scopeContext) {
                    // Si un scope spécifique est requis (ex: 'document:statut:archive')
                    // et que le 'scopeContext' fourni par la requête ne correspond pas,
                    // l'accès est refusé.
                    return res.status(403).json({ message: `Accès refusé : Le scope "${scopeRequirements.requires}" est requis.` });
                }

                // Vérification du scope 'requiresOneOf' (un des scopes d'une liste est requis)
                if (scopeRequirements.requiresOneOf && !scopeRequirements.requiresOneOf.includes(scopeContext)) {
                    // Si la permission nécessite un scope parmi une liste (ex: 'document:statut:brouillon' OU 'document:statut:publie')
                    // et que le 'scopeContext' fourni ne fait pas partie de cette liste,
                    // l'accès est refusé.
                    return res.status(403).json({ message: `Accès refusé : Un des scopes suivants est requis : ${scopeRequirements.requiresOneOf.join(', ')}.` });
                }
            }

            // --- Si tout est bon, continuer ---
            // Si toutes les vérifications (authentification, permission de base, exigences de scope) sont passées,
            // le contrôle est passé au middleware ou au gestionnaire de route suivant.
            next();

        } catch (error) {
            // --- Gestion des erreurs ---
            // Capture toute erreur inattendue qui pourrait survenir pendant le processus
            // (ex: erreur de base de données lors de la récupération des rôles/permissions).
            console.error('Erreur d\'autorisation avec scopes :', error);
            res.status(500).json({ message: 'Erreur interne du serveur lors de l\'autorisation.' });
        }
    };
};
 
export default authorizeWithScopes;