import db from '../models/index.js';
const { Personnel } = db;
import { Op } from 'sequelize';
export const getAllPersonnel = async (req, res) => {
    try {
        const personnel = await Personnel.findAll();
        if (personnel.length === 0) {
            return res.status(404).json({ message: "Aucun personnel trouvé" });
        }
        res.status(200).json(personnel);

    } catch (error) {
        console.error("Erreur lors de la récupération du personnel:", error);
        res.status(500).json({ message: "Erreur lors de la récupération du personnel" });
    }
}


export const getPersonnelById = async (req, res) => {
    const { id } = req.params;
    try {
         let filtre ={};
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) { // verifier si l'id est un nombre
            filtre = { id_personnel: id };
        } else {
            filtre = {
                [Op.or]: [
                    { matricule: id },
                    { adresse_email: id }
                ]
            };
        }
        const personnel = await Personnel.findOne({ where: { ...filtre } });
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

        const existingPersonnel = await Personnel.findOne({ where: [Op.or, { matricule: matricule }, { adresse_email: adresse_email }] });
        if (existingPersonnel) {
            return res.status(400).json({ message: "Un personnel avec ce matricule ou cette adresse email existe déjà" });
        }

        const newPersonnel = await Personnel.create({ noms,adresse_email,matricule,date_embauche, });
        if (prenoms) newPersonnel.prenoms = prenoms;
        if (telephone) newPersonnel.telephone = telephone;
        if (date_naissance) newPersonnel.date_naissance = date_naissance;
        await newPersonnel.save();

        res.status(201).json({ message: "Personnel créé avec succès", personnel: newPersonnel});
    } catch (error) {
        console.error("Erreur lors de la création du personnel:", error);
        res.status(500).json({ message: "Erreur lors de la création du personnel" });
    }
}


export const updatePersonnel = async (req, res) => {
    const { id } = req.params;
    const { noms,prenoms,adresse_email,telephone,date_embauche,date_naissance } = req.body;
    try {
        let filtre ={};
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) { // verifier si l'id est un nombre
            filtre = { id_personnel: id };
        } else {
            filtre = {
                [Op.or]: [
                    { matricule: id },
                    { adresse_email: id }
                ]
            };
        }
        if (!noms || !adresse_email || !telephone || !date_embauche) {
            return res.status(400).json({ message: "Noms, adresse_email, telephone et date_embauche sont requis" });
        }
        const personnel = await Personnel.findOne({ where: { ...filtre } });
        if (!personnel) {
            return res.status(404).json({ message: "Personnel non trouvé" });
        }
        if (noms) personnel.noms = noms;
        if (prenoms) personnel.prenoms = prenoms;
        if (adresse_email) personnel.adresse_email = adresse_email;
        if (telephone) personnel.telephone = telephone;
        if (date_embauche) personnel.date_embauche = date_embauche;
        if (date_naissance) personnel.date_naissance = date_naissance;
        await personnel.save();
        res.status(200).json({ message: "Personnel mis à jour avec succès", personnel: personnel});

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
        if (personnel.length === 0) {
            return res.status(404).json({ message: "Aucun personnel trouvé pour cette recherche" });
        }
        res.status(200).json({ message: "Personnel trouvé", personnel: personnel});
    } catch (error) {
        console.error("Erreur lors de la recherche du personnel:", error);
        res.status(500).json({ message: "Erreur lors de la recherche du personnel" });
    }
}

export const deletePersonnel = async (req, res) => {
    const { id } = req.params;
    try {
        let filtre ={};
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) { // verifier si l'id est un nombre
            filtre = { id_personnel: id };
        } else {
            filtre = {
                [Op.or]: [
                    { matricule: id },
                    { adresse_email: id }
                ]
            };
        }        
        const personnel = await Personnel.findOne({ where: { ...filtre } });
        if (!personnel) {
            return res.status(404).json({ message: "Personnel non trouvé" });
        };
        await personnel.destroy();
        res.status(204).json({ message: "Personnel supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression du personnel:", error);
        res.status(500).json({ message: "Erreur lors de la suppression du personnel" });
    }
}