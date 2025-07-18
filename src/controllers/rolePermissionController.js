import db from '../models/index.js';
const { RolePermission } = db;

export const getAllRolePermissionsController = async (req, res) => {
    try {
        const rolePermissions = await RolePermission.findAll();
        if (rolePermissions.length === 0) {
            return res.status(404).json({ message: 'Aucun rôle de permission trouvée' });
        }
        res.json(rolePermissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des rôles des permissions' });
    }
};

export const getRolePermissionByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const rolePermission = await RolePermission.findByPk(id);
        if (!rolePermission) {
            return res.status(404).json({ message: 'Rôle de permission non trouvé' });
        }
        res.json(rolePermission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération d\'un rôle de permission' });
    }
};

export const createRolePermissionController = async (req, res) => {
    try {
        const { id_role, id_permission, date_attribution, date_suppression, date_modification } = req.body;
        if (!id_role || !id_permission) {
            return res.status(400).json({ message: 'ID du rôle et de la permission sont requis' });
        }
        const rolePermission = await RolePermission.create({ id_role, id_permission });
        if (date_attribution) rolePermission.date_attribution = date_attribution;
        if (date_suppression) rolePermission.date_suppression = date_suppression;
        if (date_modification) rolePermission.date_modification = date_modification;
        await rolePermission.save();
        res.status(201).json({ message: 'Rôle de permission créé avec succès', rolePermission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création d\'un rôle de permission' });
    }
};

export const updateRolePermissionController = async (req, res) => {
    try {
        const id = req.params.id;
        const rolePermission = await RolePermission.findByPk(id);
        if (!rolePermission) {
            return res.status(404).json({ message: 'Rôle de permission non trouvé' });
        }
        const { id_role, id_permission, date_attribution, date_suppression, date_modification } = req.body;
        if (id_role) rolePermission.id_role = id_role;
        if (id_permission) rolePermission.id_permission = id_permission;
        if (date_attribution) rolePermission.date_attribution = date_attribution;
        if (date_suppression) rolePermission.date_suppression = date_suppression;
        if (date_modification) rolePermission.date_modification = date_modification;
        await rolePermission.save();
        res.json({ message: 'Rôle de permission mis à jour avec succès', rolePermission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour d\'un rôle de permission' });
    }
};

export const deleteRolePermissionController = async (req, res) => {
    try {
        const id = req.params.id;
        const rolePermission = await RolePermission.findByPk(id);
        if (!rolePermission) {
            return res.status(404).json({ message: 'Rôle de permission non trouvé' });
        }
        await rolePermission.destroy();
        res.json({ message: 'Rôle de permission supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression d\'un rôle de permission' });
    }
};
