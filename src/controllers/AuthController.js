import Utilisateur from '../models/UtilisateurModel.js';
import bcrypt from 'bcrypt';
import generateToken from './generateToken.js';


// controller pour l'authentification de l'utilisateur par email et mot de passe

const loginController = async (req, res) => {
    try {
        const { adresse_email, password } = req.body;

        if (!adresse_email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe sont requis' });
        }
        const user = await Utilisateur.findOne({ where: { adresse_email } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }
        if( !user.is_actif && user.date_demande === null) {
            return res.status(403).json({ message: 'Compte inactif, veuillez faire une demande auprés de l\'administrateur' });
        }
        if (!user.is_actif && user.date_demande !== null) {
            return res.status(403).json({ message: 'Compte inactif, veuillez attendre la validation de l\'administrateur' });
        }
        const token = generateToken(user.id_utilisateur, user.id_role); // Génération du token JWT
        res.json({ 
            message: 'Connexion réussie',
            token,
            user: {
                id: user.id_utilisateur,
                email: user.adresse_email,
                nom: user.noms,
                prenom: user.prenoms,
                matricule: user.matricule,
                id_role: user.id_role, // Assurez-vous que l'utilisateur a un rôle associé
            }
         });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
};


const askController = async (req, res) => {
    try {

    const { adresse_email, fonction, direction, justificatif } = req.body;
    if (!adresse_email || !fonction || !direction || !justificatif) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
    const existingUser = await Utilisateur.findOne({
        where: {
             adresse_email
        }
    });
    if (!existingUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    if (existingUser.is_actif) {
        return res.status(404).json({ message: "L\'Utilisateur existe deja veuillez vous connecter" });
    }
    if(existingUser.date_demande !== null) {
        return res.status(400).json({ message: `Une demande a déjà été envoyée pour cet utilisateur le ${existingUser.date_demande} a l'administrateur veuillez patienter` });
    }
    let date_demande = new Date().toISOString().replace('T', ' ').slice(0, 19); // Date et heure actuelles au format YYYY-MM-DD HH:MM:SS
    const [updatedRows] = await Utilisateur.update(
        { fonction, direction, justificatif, date_demande }, // Mettre à jour 
        { where: { adresse_email } }
    );
    if (updatedRows === 0) {
        return res.status(400).json({ message: "Aucune mise à jour effectuée" });
    }
    const updatedUser = await Utilisateur.findOne({ where: { adresse_email } });
    res.status(201).json({ message: 'Demande envoyée', user: updatedUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de la demande' });

    }

};

const registerController = async (req, res) => {
    try {
    const { adresse_email, password, password_confirmation, noms, prenoms } = req.body;
    if (!adresse_email || !password || !noms || !prenoms || !password_confirmation) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });    
    }
    if (password !== password_confirmation) { 
        return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
    }

    // verification de l'utilisateur avec email et matricule dans la base de données
    const existingUser = await Utilisateur.findOne({
        where: {
            adresse_email 
        }
    });
    if (existingUser) {
        return res.status(400).json({ message: 'L\'utilisateur avec cet email existe déjà veuillez vous connecter', user: existingUser });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const datePart = new Date().toISOString().slice(0,10).replace(/-/g, '');
    const timePart = new Date().toISOString().slice(11, 19).replace(/:/g, '');
    const matricule = `MINADER${datePart}${timePart}`; // Génération d'un matricule unique
    const user = await Utilisateur.create({ adresse_email, password: hashedPassword, noms, prenoms, matricule});
    res.status(201).json({ message: 'Utilisateur créé avec succès', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur' });
    }
    };


 export {

        loginController,
        registerController,
        askController
    };

