import { Op } from 'sequelize';
import db from '../models/index.js';
const { UtilisateurRole } = db;

export const createUtilisateurRoleController = async (req, res) => {
    const { id_utilisateur, id_role, date_attribution, date_suppression, date_modification } = req.body;
    try {
        if (!id_utilisateur || !id_role) {
            return res.status(400).json({ message: 'id_utilisateur et id_role sont requis' });
        }
        const utilisateurRole = await UtilisateurRole.create({ id_utilisateur, id_role });
        if(date_attribution) utilisateurRole.date_attribution = date_attribution;
        if(date_suppression) utilisateurRole.date_suppression = date_suppression;
        if(date_modification) utilisateurRole.date_modification = date_modification;
        await utilisateurRole.save();
        res.status(201).json({ message: 'Utilisateur rôle créé avec succès', data: utilisateurRole });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur rôle:', error);
        res.status(500).json({ message: 'Erreur dans l\'application' });
    }
};

export const getAllUtilisateurRoleController = async (req, res) => {
    try {
        const utilisateurRoles = await UtilisateurRole.findAll({
            where: {
                [Op.not]: [
                    { id_utilisateur: null }, 
                    { id_role: null }
                ]
            }
        });
        if (utilisateurRoles.length === 0) {
            return res.status(404).json({ message: 'Aucun utilisateur rôle trouvé' });
        }
        res.status(200).json({ message: 'Liste des utilisateurs rôles', data: utilisateurRoles });
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs rôles:', error);
        res.status(500).json({ message: 'Erreur dans l\'application' });
    }
};

export const getUtilisateurRoleByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const utilisateurRole = await UtilisateurRole.findByPk(id);
        if (!utilisateurRole) {
            return res.status(404).json({ message: 'Utilisateur rôle non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur rôle trouvé', data: utilisateurRole });
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur rôle:', error);
        res.status(500).json({ message: 'Erreur dans l\'application' });
    }
};

export const updateUtilisateurRoleController = async (req, res) => {
    const { id } = req.params;
    const { id_utilisateur, id_role, date_attribution, date_suppression, date_modification } = req.body;
    try {
        const utilisateurRole = await UtilisateurRole.findByPk(id);
        if (!utilisateurRole) {
            return res.status(404).json({ message: 'Utilisateur rôle non trouvé' });
        }
        //await utilisateurRole.update({ id_utilisateur, id_role, date_attribution, date_suppression, date_modification });
        if(id_utilisateur) utilisateurRole.id_utilisateur = id_utilisateur;
        if(id_role) utilisateurRole.id_role = id_role;
        if(date_attribution) utilisateurRole.date_attribution = date_attribution;
        if(date_suppression) utilisateurRole.date_suppression = date_suppression;
        if(date_modification) utilisateurRole.date_modification = date_modification;
        await utilisateurRole.save();
        res.status(200).json({ message: 'Utilisateur rôle mis à jour avec succès', data: utilisateurRole });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur rôle:', error);
        res.status(500).json({ message: 'Erreur dans l\'application' });
    }
};

export const deleteUtilisateurRoleController = async (req, res) => {
    const { id } = req.params;
    try {
        const utilisateurRole = await UtilisateurRole.findByPk(id);
        if (!utilisateurRole) {
            return res.status(404).json({ message: 'Utilisateur rôle non trouvé' });
        }
        await utilisateurRole.destroy();
        res.status(200).json({ message: 'Utilisateur rôle supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur rôle:', error);
        res.status(500).json({ message: 'Erreur dans l\'application' });
    }
};
