import Personnel from "../models/PersonnelModel.js";
import { Op } from "sequelize";



export const getAllPersonnel = async (req, res) => {
    try {
        const personnel = await Personnel.findAll();
        res.status(200).json(personnel);
        
        if (personnel.length === 0) {
            return res.status(404).json({ message: "Aucun personnel trouvé" });
        }

    } catch (error) {
        console.error("Erreur lors de la récupération du personnel:", error);
        res.status(500).json({ message: "Erreur lors de la récupération du personnel" });
    }
}


export const getPersonnelById = async (req, res) => {
    const { id } = req.params;
    try {
        const personnel = await Personnel.findByPk(id);
        if (!personnel) {
            return res.status(404).json({ message: "Personnel non trouvé" });
        }
        res.status(200).json(personnel);
    } catch (error) {
        console.error("Erreur lors de la récupération du personnel:", error);
        res.status(500).json({ message: "Erreur lors de la récupération du personnel" });
    }
}

export const createPersonnel = async (req, res) => {
    const { noms,prenoms,adresse_email,telephone,matricule,date_embauche,date_naissance } = req.body;
    try {
        if (!noms || !matricule || !date_embauche || !adresse_email || !telephone) {
            return res.status(400).json({ message: "Noms, matricule, date_embauche, adresse_email et telephone sont requis" });
        }

        const newPersonnel = await Personnel.create({ noms,prenoms,adresse_email,telephone,matricule,date_embauche,date_naissance });
        res.status(201).json(newPersonnel);
    } catch (error) {
        console.error("Erreur lors de la création du personnel:", error);
        res.status(500).json({ message: "Erreur lors de la création du personnel" });
    }
}


export const updatePersonnel = async (req, res) => {
    const { id } = req.params;
    const { noms,prenoms,adresse_email,telephone,date_embauche,date_naissance } = req.body;
    try {
        if (!noms || !adresse_email || !telephone || !date_embauche) {
            return res.status(400).json({ message: "Noms, adresse_email, telephone et date_embauche sont requis" });
        }
        const personnel = await Personnel.findByPk(id);
        if (!personnel) {
            return res.status(404).json({ message: "Personnel non trouvé" });
        }
        personnel.noms = noms;
        personnel.prenoms = prenoms;
        personnel.adresse_email = adresse_email;
        personnel.telephone = telephone;
        personnel.date_embauche = date_embauche;
        personnel.date_naissance = date_naissance;
        await personnel.save();
        res.status(200).json(personnel);

    } catch (error) {
        console.error("Erreur lors de la suppression du personnel:", error);
        res.status(500).json({ message: "Erreur lors de la suppression du personnel" });
    }
}

export const searchPersonnel = async (req, res) => {
    const { query } = req.query;
    try {
        const personnel = await Personnel.findAll({
            where: {
                [Op.or]: [
                    { noms: { [Op.iLike]: `%${query}%` } },
                    { adresse_email: { [Op.iLike]: `%${query}%` } },
                    { matricule: { [Op.iLike]: `%${query}%` } }
                ]
            }
        });
        res.status(200).json(personnel);
        if (personnel.length === 0) {
            return res.status(404).json({ message: "Aucun personnel trouvé pour cette recherche" });
        }
    } catch (error) {
        console.error("Erreur lors de la recherche du personnel:", error);
        res.status(500).json({ message: "Erreur lors de la recherche du personnel" });
    }
}

export const deletePersonnel = async (req, res) => {
    const { id } = req.params;
    try {
        const personnel = await Personnel.findByPk(id);
        if (!personnel) {
            return res.status(404).json({ message: "Personnel non trouvé" });
        }
        await personnel.destroy();
        res.status(204).json({message: "Personnel supprimé avec succès"});
    } catch (error) {
        console.error("Erreur lors de la suppression du personnel:", error);
        res.status(500).json({ message: "Erreur lors de la suppression du personnel" });
    }
}