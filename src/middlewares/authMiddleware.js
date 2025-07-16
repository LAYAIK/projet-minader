import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwtConfig.js'; // Assurez-vous que le secret JWT est importé correctement
import db from '../models/index.js';

const { Utilisateur, Role } = db;

// Middleware pour protéger les routes (vérifier le token)
 const authenticateToken = async (req, res, next) => {
  let token;

  // Vérifier si le token est présent dans les headers (Bearer Token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extraire le token (ignorer "Bearer ")
      token = req.headers.authorization.split(' ')[1];
       console.log('Token extrait:', token); // Pour débogage, à supprimer en production
      // Vérifier le token
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('Token décodé:', decoded); // Pour débogage, à supprimer en production
      console.log('ID utilisateur extrait du token:', decoded.id); // Pour débogage, à supprimer en production

      // Chercher l'utilisateur dans la base de données (sans son mot de passe)
      const user = await Utilisateur.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });
      console.log('Utilisateur trouvé:', user); // Pour débogage, à supprimer en production
      console.log('Utilisateur trouvé id :',decoded.id); // Pour débogage, à supprimer en production
      const role = await Role.findByPk(user.id_role);
      if (!user) {
        return res.status(401).json({ message: 'Non autorisé, utilisateur non trouvé.' });
      }
      //req.userId = decoded.id; // Stocker l'ID de l'utilisateur dans la requête
      req.user = {
        id_utilisateur: decoded.id,
        role: role.nom_role,
      }; // Attache un nouvel objet avec seulement l'id et le rôle
      next(); // Passer au middleware ou contrôleur suivant

    } catch (error) {
      console.error('Erreur de validation du token:', error.message);
      return res.status(401).json({ message: 'Non autorisé, token invalide ou expiré.' });
    }
  } else {
    return res.status(401).json({ message: 'Non autorisé, pas de token fourni.' });
  } 
};

// Middleware pour restreindre l'accès basé sur les rôles

const authorize = (...roles) => { // Prend un tableau de rôles autorisés (ex: 'admin', 'agent')
  return (req, res, next) => {
//   console.log('User role from token:', req.user.role); // Vérifiez ce qui est extrait du token
//   console.log('Allowed roles for this route:', roles); // Vérifiez les rôles attendus
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès refusé, vous n\'avez pas la permission pour cette action.' });
    }
    next();
  };
};

export { authenticateToken, authorize };