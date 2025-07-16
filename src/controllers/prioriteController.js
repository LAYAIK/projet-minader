import db from '../models/index.js';
const { Priorite } = db;

export const getAllPriorite = async (req, res) => {
    try {
        const priorites = await Priorite.findAll();
        if (priorites.length === 0) {
            return res.status(404).json({ message: 'Aucune priorité trouvée' });
        }
        res.json(priorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des priorités' });
    }
};

export const getPrioriteById = async (req, res) => {
    try {
        const priorite = await Priorite.findByPk(req.params.id);
        if (!priorite) {
            return res.status(404).json({ message: 'Priorité non trouvée' });
        }
        res.json(priorite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la priorité' });
    }
};

export const createPriorite = async (req, res) => {
    const { niveau,description } = req.body;
    try {
        if (!niveau) {
            return res.status(400).json({ message: 'Le niveau est requis' });
        }
        const priorite = await Priorite.create( { niveau });
        if (description) priorite.description = description;
        await priorite.save();
        res.status(201).json(priorite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de la priorité' });
    }
};

export const updatePriorite = async (req, res) => {
        const { id } = req.params;
        const { niveau, description } = req.body;
    try {
        if(!id){
            return res.status(400).json({ message: 'L\'id est requis' });
        }
        const [updatedRows, [priorite]] = await Priorite.update(
            { niveau, description },
            { where: { id_priorite: id }, returning: true }
        );
        if (updatedRows === 0) {
            return res.status(400).json({ message: "Aucune mise à jour effectuée" });
        }
        res.json(priorite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la priorité' });
    }
};

export const deletePriorite = async (req, res) => {
    try {
        const deletedRows = await Priorite.destroy({
            where: {
                id_priorite: req.params.id
            }
        });
        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Priorité non trouvée' });
        }
        res.json({ message: 'Priorité supprimée' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la priorité' });
    }
};
