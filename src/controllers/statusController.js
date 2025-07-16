import db from '../models/index.js';
const { Status } = db;

export const getAllStatusesController = async (req, res) => {
    try {
        const statuses = await Status.findAll();
        if (statuses.length === 0) {
            return res.status(404).json({ message: 'Aucun statut trouvé' });
        }
        res.status(200).json(statuses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des statuts' });
    }
};

export const getStatusByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const status = await Status.findByPk(id);
        if (!status) {
            return res.status(404).json({ message: 'Statut non trouvé' });
        }
        res.status(200).json(status);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du statut' });
    }
};

export const createStatusController = async (req, res) => {
    const { libelle, description } = req.body;
    try {
        const status = await Status.create({ libelle });
        if (description) status.description = description;
        await status.save();    
        res.status(201).json({ message: 'Statut créé avec succès', status });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du statut' });
    }
};

export const updateStatusController = async (req, res) => {
    const { id } = req.params;
    const { libelle, description } = req.body;
    try {
        const [updatedRows] = await Status.update({ libelle, description }, { where: { id_status: id } });
        if (updatedRows === 0) {
            return res.status(400).json({ message: 'Aucune mise à jour effectuée et aucun statut trouvé' });
        }
        res.status(200).json({ message: 'Statut mis à jour avec succès', status: await Status.findByPk(id) });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut' });
    }
};

export const deleteStatusController = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await Status.destroy({ where: { id_status: id } });
        if (deletedRows === 0) {
            return res.status(400).json({ message: 'Aucune suppression effectuée' });
        }
        res.status(200).json({ message: 'Statut supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du statut' });
    }
};
