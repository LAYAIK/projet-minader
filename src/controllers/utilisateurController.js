import Utilisateur from "../models/UtilisateurModel.js";
import Role from "../models/RoleModel.js";
import { Op } from "sequelize";
import generateToken from "./generateToken.js";
import bcrypt from "bcrypt";

// Création d'un utilisateur
async function createUserController(req, res) {
    const { adresse_email, password, password_confirmation, noms, prenoms, fonction,direction , justificatif,id_role, id_structure, id_expediteur } = req.body;

    if (!adresse_email || !password || !noms || !password_confirmation) {
        return res.status(400).json({
            success: false,
            message: "Email, password et noms sont requis"
        });
    }

    if (password !== password_confirmation) {
        return res.status(400).json({ message: "Veuillez vérifier les mots de passe" });
    }

    try {
        const user = await Utilisateur.findOne({ where: { adresse_email } });
        if (user) {
            return res.status(409).json({
                success: false,
                message: `L'utilisateur existe déjà`,
                user: user
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Utilisateur.create({
            adresse_email,
            noms,
            password: hashedPassword,
            prenoms,
            fonction,
            direction,
            justificatif,
           // id_role,
            //id_structure,
           // id_expediteur
        });

        // Exclure le mot de passe de la réponse
        const { password: _, ...userResponse } = newUser.toJSON();

        return res.status(201).json({
            success: true,
            message: "Utilisateur créé avec succès",
            data: userResponse
        });

    } catch (error) {
        console.error('Erreur de création de l\'utilisateur:', error);
        return res.status(500).json({
            success: false,
            message: "Erreur dans l'application",
            system_message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Récupérer tous les utilisateurs
async function getAllUsersController(req, res) {
    try {
        const users = await Utilisateur.findAll({
            attributes: { exclude: ['password', 'refreshToken'] } // Exclure le mot de passe et le refreshToken de la réponse
        });

        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Aucun utilisateur trouvé"
            });
        }

        return res.status(200).json({
            success: true,
            data: users
        });

    } catch (error) {
        console.error('Erreur durant la recherche des utilisateurs:', error);
        return res.status(500).json({
            success: false,
            message: "Erreur dans l'application",
            system_message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Récupérer un utilisateur par id, adresse_email ou noms
async function getUserByIdController(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "ID ou adresse_email est requis"
        });
    }

    try {
        let user;
        if (/^\d+$/.test(id)) { // verifier si l'id est un nombre
            user = await Utilisateur.findByPk(id, { attributes: { exclude: ['password', 'refreshToken'] } });
        } else {
            user = await Utilisateur.findOne({
                where: {
                    [Op.or]: [
                        { adresse_email: id },
                        { id_utilisateur: id }
                    ]
                },
                attributes: { exclude: ['password', 'refreshToken'] }
            });
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé"
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
            message: "Utilisateur trouvé"
        });

    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        return res.status(500).json({
            success: false,
            message: "Erreur dans l'application",
            system_message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}
async function updateUserController(req, res) {
    const { id } = req.params;
    const {password, noms, prenoms, fonction, direction, justificatif, id_role, id_structure, id_expediteur,adresse_email } = req.body || {};

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "ID ou adresse_email est requis"
        });
    }

    try {
        if (password) {
            hashedpassword = await bcrypt.hash(password, 10);
        }
        const updateData = {};
        if (password) {
            updateData.password = hashedpassword;
        }
        if (noms) {
            updateData.noms = noms;
        }
        if (prenoms) {
            updateData.prenoms = prenoms;
        }
        if (fonction) {
            updateData.fonction = fonction;
        }
        if (direction) {
            updateData.direction = direction;
        }
        if (justificatif) {
            updateData.justificatif = justificatif;
        }
        if (id_role) {
            updateData.id_role = id_role;
        }
        if (id_structure) {
            updateData.id_structure = id_structure;
        }
        if (id_expediteur) {
            updateData.id_expediteur = id_expediteur;
        }
        if (adresse_email) {
            updateData.adresse_email = adresse_email;
        }

        let filter;
        if (/^\d+$/.test(id)) {
            filter = { id_utilisateur: id };
        } else {
            filter = {
                [Op.or]: [
                    { adresse_email: id },
                    { id_utilisateur: id }
                ]
            };
        }
        const [updatedRows, [updatedUser]] = await Utilisateur.update(updateData, {
            where: filter,
            returning: true 
        });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé"
            });
        }

        const { password: _, ...userResponse } = updatedUser.toJSON();

        return res.status(200).json({
            success: true,
            message: "Utilisateur mis à jour avec succès",
            data: userResponse
        });

    } catch (error) {
        console.error('Erreur de mise à jour:', error);
        return res.status(500).json({
            success: false,
            message: "Erreur interne du serveur",
            system_message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Suppression d'un utilisateur
async function deleteUserController(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "ID or adresse_email est requis"
        });
    }

    try {
        let filter;
        if (/^\d+$/.test(id)) {
            filter = { id_utilisateur: id };
        } else {
            filter = {
                [Op.or]: [
                    { adresse_email: id },
                    { id_utilisateur: id }
                ]
            };
        }

        const deletedUser = await Utilisateur.findOne({ where: filter });
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé"
            });
        }

        await deletedUser.destroy();

        return res.status(200).json({
            success: true,
            message: "Utilisateur supprimé avec succès",
            deleted_id: deletedUser.id
        });

    } catch (error) {
        console.error('Erreur de suppression:', error);
        return res.status(500).json({
            success: false,
            message: "Erreur interne du serveur",
            system_message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Authentification utilisateur
async function authenticateUserController(req, res) {
    const { adresse_email, password } = req.body || {};

    if (!adresse_email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email et mot de passe sont requis"
        });
    }

    try {
        const user = await Utilisateur.findOne({ where: { adresse_email } });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Identifiants invalides"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Identifiants invalides"
            });
        }
        const role = await Role.findByPk(user.id_role);
        const token = generateToken(user.id_utilisateur, role.nom);

        return res
            // .header('Authorization', `Bearer ${token}`) // Ajouter le token dans l'en-tête de la réponse
            // .cookie('token', token, {  // Créer un cookie avec le token
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === 'production',
            //     sameSite: 'strict',
            //     maxAge: 24 * 60 * 60 * 1000
            // })
            .status(200)
            .json({
                token,
                success: true,
                message: "Authentification réussie",
                data: {
                    id: user.id,
                    adresse_email: user.adresse_email,
                    noms: user.noms,
                    role: role.nom_role,
                }
            });

    } catch (error) {
        console.error('Erreur lors de l\'authentification:', error);
        return res.status(500).json({
            success: false,
            message: "Erreur d'authentification",
            system_message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// controller pour rechercher un utilisateur par son noms, email,id,fonction, direction, prenoms
async function searchUserController(req, res) {
    const { query } = req.query;    
    if (!query) {
        return res.status(400).json({
            success: false,
            message: "La requête de recherche est requise"
        });
    }
    try {
        const users = await Utilisateur.findAll({
            where: {
                [Op.or]: [
                    { adresse_email: { [Op.iLike]: `%${query}%` } },
                    { noms: { [Op.iLike]: `%${query}%` } },
                    { prenoms: { [Op.iLike]: `%${query}%` } },
                    { fonction: { [Op.iLike]: `%${query}%` } },
                    { direction: { [Op.iLike]: `%${query}%` } }
                ]
            }
        });
        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Aucun utilisateur trouvé"
            });
        }
        return res.status(200).json({
            success: true,
            data: users,
        });      
    } catch (error) {
        console.error('Erreur lors de la recherche de l\'utilisateur:', error);
        return res.status(500).json({
            success: false,
            message: "Erreur lors de la recherche de l'utilisateur",
            system_message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });

    }
}

export {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController,
    authenticateUserController,
    searchUserController
};
