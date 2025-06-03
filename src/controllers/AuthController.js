import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DATEONLY, Op } from 'sequelize';
import dotenv from 'dotenv';


// dotenv.config(); // Charge les variables d'environnement depuis le fichier .env

const JWT_SECRET = process.env.JWT_SECRET ;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h'; // Durée d'expiration du token, par défaut 1 heure

// controller pour l'authentification de l'utilisateur par username et mot de passe

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe sont requis' });
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        if( user.statut_compte !== 'actif') {
            return res.status(403).json({ message: 'Compte inactif, veuillez faire une demande auprés de l\'administrateur' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
        res.json({ 
            message: 'Connexion réussie',
            token,
            user: {
                id: user.id,
                email: user.email,
                nom: user.nom,
                prenom: user.prenom,
                matricule: user.matricule,
                role: user.role
            }
         });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
};


const askController = async (req, res) => {
    try {

    const { email, nom_complet, fonction, direction, justificatif } = req.body;
    if (!email || !nom_complet || !fonction || !direction || !justificatif) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
    const existingUser = await User.findOne({
        where: {
            [Op.and]: [
                { email },
                {nom_complet },
            ]
        }
    });
    if (!existingUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    let status = existingUser.statut_compte;
    if (status === 'actif') {
        return res.status(400).json({ message: `Utilisateur est actif connectez-vous avec votre email: ${existingUser.email} et le mot de passe` });
    }
    if(existingUser.date_demande !== null) {
        return res.status(400).json({ message: `Une demande a déjà été envoyée pour cet utilisateur le ${existingUser.date_demande} a l'administrateur veuillez patienter` });
    }
    let date_demande = new Date().toISOString().replace('T', ' ').slice(0, 19); // Date et heure actuelles au format YYYY-MM-DD HH:MM:SS
    const [updatedRows] = await User.update(
        { nom_complet, fonction, direction, justificatif, date_demande }, // Mettre à jour 
        { where: { email } }
    );
    if (updatedRows === 0) {
        return res.status(400).json({ message: "Aucune mise à jour effectuée" });
    }
    const updatedUser = await User.findOne({ where: { email } });
    res.status(201).json({ message: 'Demande envoyée', user: updatedUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de la demande' });

    }

};

const registerController = async (req, res) => {
    try {
    const { email, password, password_confirmation, nom, prenom } = req.body;
    if (!email || !password || !nom || !prenom || !password_confirmation) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });    
    }
    if (password !== password_confirmation) { 
        return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
    }

    // verification de l'utilisateur avec email et matricule dans la base de données
    const existingUser = await User.findOne({
        where: {
            [Op.or]: [
                { email },
            ]
        }
    });

    if (existingUser) {
        return res.status(400).json({ message: 'Utilisateur existant' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const datePart = new Date().toISOString().slice(0,10).replace(/-/g, '');
    const timePart = new Date().toISOString().slice(11, 19).replace(/:/g, '');
    const matricule = `MINADER${datePart}${timePart}`; // Génération d'un matricule unique
    const nom_complet = `${nom} ${prenom}`; // Création du nom complet à partir du nom et prénom
    const user = await User.create({ email, password: hashedPassword, nom, prenom, matricule, nom_complet});
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

