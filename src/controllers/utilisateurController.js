import Utilisateur from "../models/UtilisateurModel.js";
import Role from "../models/RoleModel.js";
import { Op } from "sequelize";
import generateToken from "./generateToken.js";
import bcrypt from "bcrypt";

// Création d'un utilisateur
async function createUserController(req, res) {
    const { adresse_email, password, password_confirmation, noms, prenoms } = req.body;

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
            prenoms
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
            attributes: { exclude: ['password', 'refreshToken'] }
        });

        if (!users || users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Aucun utilisateur trouvé"
            });
        }

        return res.status(200).json({
            success: true,
            count: users.length,
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
        if (/^\d+$/.test(id)) {
            user = await Utilisateur.findByPk(id, { attributes: { exclude: ['password', 'refreshToken'] } });
        } else {
            user = await Utilisateur.findOne({
                where: {
                    [Op.or]: [
                        { adresse_email: id },
                        //{ noms: id }
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

// Mise à jour d'un utilisateur
async function updateUserController(req, res) {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "ID, adresse_email ou noms est requis"
        });
    }

    try {
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        let filter;
        if (/^\d+$/.test(id)) {
            filter = { id_utilisateur: id };
        } else {
            filter = {
                [Op.or]: [
                    { adresse_email: id },
                    //{ noms: id }
                ]
            };
        }

        const [updatedRows, [updatedUser]] = await Utilisateur.update(updateData, {
            where: filter,
            returning: true,
            individualHooks: true
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
                    { adresse_email: id }
                   // { noms: id }
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
        const token = generateToken(user.id, role.nom_role);

        return res
            .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            })
            .status(200)
            .json({
                success: true,
                message: "Authentification réussie",
                data: {
                    token,
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

export {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController,
    authenticateUserController
};
