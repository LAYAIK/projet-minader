import db from '../models/index.js';
const { Permission } = db;
export const createPermissionController = async (req, res) => {
    try {
        const { nom, description } = req.body;
        if (!nom ) {
            return res.status(400).json({ message: 'Nom et description sont requis' });
        }
        const permission = await Permission.create({ nom });
        if (description) permission.description = description;
        await permission.save();

        res.status(201).json({ message: 'Permission créée avec succès', permission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de la permission' });
    }
};

export const getAllPermissionsController = async (req, res) => {
    try {
        const permissions = await Permission.findAll();
        if (permissions.length === 0) {
            return res.status(404).json({ message: 'Aucune permission trouvée' });
        }
        res.json(permissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des permissions' });
    }
};

export const getPermissionByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const permission = await Permission.findByPk(id);
        if (!permission) {
            return res.status(404).json({ message: 'Permission non trouvée' });
        }
        res.json(permission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la permission' });
    }
};

export const updatePermissionController = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description } = req.body;
        if (!nom || !description) {
            return res.status(400).json({ message: 'Nom et description sont requis' });
        }
        const [updatedRows, [updatedPermission]] = await Permission.update(
            { nom, description },
            { where: { id_permission: id }, returning: true }
        );
        if (updatedRows === 0) {
            return res.status(400).json({ message: 'Aucune mise à jour effectuée' });
        }
        res.json({ message: 'Permission mise à jour avec succès', permission: updatedPermission });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la permission' });
    }
};

export const deletePermissionController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await Permission.destroy({ where: { id_permission: id } });
        if (deletedRows === 0) {
            return res.status(400).json({ message: 'Aucune suppression effectuée' });
        }
        res.json({ message: 'Permission supprimée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la permission' });
    }
};
