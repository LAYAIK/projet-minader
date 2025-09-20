import db from '../models/index.js';
const {Objet} = db;
export const createObjetController = async (req, res) => {
    try {
        const { libelle, description } = req.body;
        if (!libelle) {
            return res.status(400).json({ message: 'Le libellé est requis' });
        }
        const objet = await Objet.create({ libelle });

        if(description) { 
            Objet.description = description
        } 
        await objet.save();
        res.status(201).json({ message: 'Objet créé avec succès', objet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de l\'objet' });
    }
};

export const getAllObjetsController = async (req, res) => {
    try {
        const objets = await Objet.findAll();
        if(objets.length === 0) {
            return res.status(404).json({ message: 'Aucun objet trouvé' });
        }
            
        res.status(200).json(objets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la liste des objets' });
    }
};

export const getObjetByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'L\'id de l\'objet est requis' });
        }
        const objet = await Objet.findByPk(id);
        if (!objet) {
            return res.status(404).json({ message: 'Objet non trouvé' });
        }
        res.json({ message: 'Objet trouvé', objet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'objet' });
    }
};

export const updateObjetController = async (req, res) => {
    try {
        const { id } = req.params;
        const { libelle, description } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'L\'id de l\'objet est requis' });
        }
        const objet = await Objet.findByPk(id);
        if (!objet) {
            return res.status(404).json({ message: 'Objet non trouvé' });
        }
        await objet.update({ libelle, description });
        res.json({ message: 'Objet mis à jour avec succès', objet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'objet' });
    }
};

export const deleteObjetController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'L\'id de l\'objet est requis' });
        }
        const objet = await Objet.findByPk(id);
        if (!objet) {
            return res.status(404).json({ message: 'Objet non trouvé' });
        }
        await objet.destroy();
        res.json({ message: 'Objet supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'objet' });
    }
};
