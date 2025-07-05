import Archive from '../models/ArchiveModel.js';
import { Op } from 'sequelize';




export const getAllArchives = async (req, res) => {
    try {
        const archives = await Archive.findAll();
        res.status(200).json(archives);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des archives' });
    }
}

export const getArchiveById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'L\'ID de l\'archive est requis' });
        }
        const archive = await Archive.findByPk(id);
        if (!archive) {
            return res.status(404).json({ message: 'Archive non trouvée' });
        }
        res.status(200).json(archive);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'archive' });
    }
}

export const createArchive = async (req, res) => {
    try {
        const { description } = req.body;
        if (!description) {
            return res.status(400).json({ message: 'La description est requise' });
        }
        const newArchive = await Archive.create({ description });
        res.status(201).json(newArchive);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'archive' });
    }
}
export const updateArchive = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const archive = await Archive.findByPk(id);
        if (!archive) {
            return res.status(404).json({ message: 'Archive non trouvée' });
        }
        archive.description = description || archive.description;
        await archive.save();
        res.status(200).json(archive);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'archive' });
    }
}

export const deleteArchive = async (req, res) => {
    try {
        const { id } = req.params;
        const archive = await Archive.findByPk(id);
        if (!archive) {
            return res.status(404).json({ message: 'Archive non trouvée' });
        }
        await archive.destroy();
        res.status(200).json({ message: 'Archive supprimée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'archive' });
    }
}

export const searchArchives = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Le paramètre de recherche (query) est requis.' });
        }
        const queryType = isNaN(query) ? 'string' : 'date';
        console.log('Type de requête:', queryType);
        const whereConditions = {
            [Op.or]: [
                //{ numero_courrier: { [Op.iLike]: `%${query}%` } },
                { description: { [Op.iLike]: `%${query}%` } }
            ]
        };
        const dateQuery = new Date(query);
        if (!isNaN(dateQuery.getTime())) { 
            const startOfDay = new Date(dateQuery);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);

            whereConditions[Op.or].push({
                date_archivage: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            });
        };
        const Archives = await Archive.findAll({
            where: whereConditions
        });
        res.status(200).json(Archives);
    } catch (error) {
        console.error('Erreur lors de la recherche des archives:', error);
        res.status(500).json({ message: 'Erreur lors de la recherche des archives' });
    }
}