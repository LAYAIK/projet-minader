import db from '../models/index.js';
const { Structure } = db;
import { Op } from 'sequelize';
export const createController = async (req, res) => {
    try {
        const { description, nom, date_creation, id_structure } = req.body;
        if (!description || !nom) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }
        let filtre = {};
        if (id_structure) filtre = { id_structure };
        const existingStructure = await Structure.findOne({
            where: {[Op.or]: [{ id_structure }, { nom }],},
        });
        if (existingStructure) {
            return res.status(400).json({ message: 'La structure existe déjà' });
        }
        const createdStructure = await Structure.create({ nom,});
        if (description) createdStructure.description = description;
        if (date_creation) createdStructure.date_creation = date_creation;
        await createdStructure.save();

        res.status(201).json({ message: 'Structure créée avec succès', structure: createdStructure });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de la structure' });
    }
};
export const getAllController = async (req, res) => {
    try {
        const structures = await Structure.findAll();
        if (!structures || structures.length === 0) {
            return res.status(404).json({ message: 'Aucune structure trouvée' });
        }
        res.status(200).json(structures);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des structures' });
    }
};

export const updateController = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, nom, date_creation } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'L\'id de la structure est requis ou le nom de la structure' });
        }
        let filtre = {};
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) { // verifier si l'id est un nombre
            filtre = { id_structure: id };
        } else {
            filtre = {
                [Op.or]: [
                  //  { id_structure: id },
                    { nom: id }
                ]
            };
        }
        const structure = await Structure.findOne({ where: filtre });
        if (!structure) {
            return res.status(404).json({ message: 'La structure n\'existe pas' });
        }
        if (description) structure.description = description;
        if (nom) structure.nom = nom;
        if (date_creation) structure.date_creation = date_creation;
        await structure.save();
        res.status(200).json({ message: 'Structure mise à jour avec succès', structure });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la structure' });
    }
};

export const deleteController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'L\'id de la structure est requis' });
        }
        let filtre = {};
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) { // verifier si l'id est un nombre
            filtre = { id_structure: id };
        } else {
            filtre = {
                [Op.or]: [
                   // { id_structure: id },
                    { nom: id }
                ]
            };
        }
        const structure = await Structure.findOne({ where: filtre });
        if (!structure) {
            return res.status(404).json({ message: 'La structure n\'existe pas' });
        }
        await structure.destroy();
        res.status(200).json({ message: 'Structure supprimée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la structure' });
    }
};

export const searchController = async (req, res) => {
    try {
        const { nom, description, date_creation, id_structure } = req.query;
        const structures = await Structure.findAll({
            where: {
                nom: {
                    [Op.iLike]: `%${nom}%`
                },
                description: {
                    [Op.iLike]: `%${description}%`
                },
                date_creation: {
                    [Op.iLike]: `%${date_creation}%`
                },
                id_structure: {
                    [Op.iLike]: `%${id_structure}%`

                }
            }
        });
        if (!structures || structures.length === 0) {
            return res.status(404).json({ message: 'Aucune structure trouvée' });
        }
        res.status(200).json(structures);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la recherche des structures' });
    }
};

export const getByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        let filtre = {};
        if (!id) {
            return res.status(400).json({ message: 'L\'id de la structure est requis' });
        }
                if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) { // verifier si l'id est un nombre
            filtre = { id_structure: id };
        } else {
            filtre = {
                [Op.or]: [
                    //{ id_structure: id },
                    { nom: id }
                ]
            };
        }
        const structure = await Structure.findOne({ where: filtre});
        if (!structure) {
            return res.status(404).json({ message: 'La structure n\'existe pas' });
        }
        res.status(200).json(structure);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la lecture de la structure' });
    }
};
