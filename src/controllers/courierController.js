import Courrier from "../models/CourrierModel.js";
import { Op } from "sequelize";



export const getAllCouriers = async (req, res) => {
    try {
        const couriers = await Courrier.findAll();
        if (!couriers || couriers.length === 0) {
            return res.status(404).json({ message: 'Aucun courrier trouvé' });
        }
        res.status(200).json(couriers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des courriers' });
    }
}

export const getCourierById = async (req, res) => {
    try {
        const  id  = req.params.id;
        if (!id) {
            return res.status(400).json({ message: 'L\'ID du courrier est requis' });
        }
        const courier = await Courrier.findByPk(id);
        if (!courier) {
            return res.status(404).json({ message: 'Courrier non trouvé' });
        }
        res.status(200).json(courier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du courrier' });
    }
}

export const createCourier = async (req, res) => {
        //let destinataires = [];
    try {
        const { objet, date_envoi,date_reception,date_archivage,date_traitement,
            est_archive, numero_courrier, nature, id_destinataires, status,
            id_expediteur,id_structure,priorite,documents_associes, contenu , type_courrier } = req.body;
        if (!objet || !id_expediteur || !numero_courrier || !contenu) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }   
        const existingCourier = await Courrier.findOne({ where: { numero_courrier } }); 
        if (existingCourier) {
            return res.status(400).json({ message: 'Un courrier avec ce numéro de courrier existe deja' });
        }
        const newCourier = await Courrier.create({ objet, est_archive, numero_courrier, nature, status,
            id_expediteur,id_structure,priorite,contenu });

        if (id_destinataires && Array.isArray(id_destinataires)) {  
            newCourier.id_destinataires = id_destinataires; // Assigner les destinataires
            await newCourier.save(); // Sauvegarder les modifications
        }

        if (documents_associes && Array.isArray(documents_associes)) {
            newCourier.documents_associes = documents_associes;
            await newCourier.save();
        }
        if (date_archivage) {
            newCourier.date_archivage = date_archivage;
            await newCourier.save();
        }
        if (date_envoi) {
            newCourier.date_envoi = date_envoi;
            await newCourier.save();
        }
        if (date_reception) {
            newCourier.date_reception = date_reception;
            await newCourier.save();
        }
        if (date_traitement) {
            newCourier.date_traitement = date_traitement;
            await newCourier.save();
        }
        if (type_courrier) {
            newCourier.type_courrier = type_courrier;
            await newCourier.save();
        }
        res.status(201).json({message: 'Courrier créé avec succès', newCourier});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du courrier' });
    }
}

export const updateCourier = async (req, res) => {
    try {
        const { id } = req.params;
        const { objet, date_envoi,date_reception,date_archivage,date_traitement,
            est_archive, nature, id_destinataires, status,
            id_structure,priorite,documents_associes, contenu , type_courrier } = req.body;
        const courier = await Courrier.findByPk(id);
        if (!courier) {
            return res.status(404).json({ message: 'Courrier non trouvé' });
        }
        courier.objet = objet || courier.objet;
        courier.date_envoi = date_envoi || courier.date_envoi;
        courier.nature = nature || courier.nature;
        courier.id_structure = id_structure || courier.id_structure;
        courier.type_courrier = type_courrier || courier.type_courrier;
        courier.date_reception = date_reception || courier.date_reception;
        courier.id_destinataires = id_destinataires || courier.id_destinataires;
        courier.est_archive = est_archive || courier.est_archive;
        courier.priorite = priorite || courier.priorite;
        courier.status = status || courier.status;
        courier.date_archivage = date_archivage || courier.date_archivage;
        courier.date_traitement = date_traitement || courier.date_traitement;
        courier.contenu = contenu || courier.contenu;
        courier.documents_associes = documents_associes || courier.documents_associes;
        await courier.save();
        res.status(200).json({ message: 'Courrier mis à jour avec succès', courier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du courrier' });
    }
}

export const deleteCourier = async (req, res) => {
    try {
        const { id } = req.params;
        const courier = await Courrier.findByPk(id);
        if (!courier) {
            return res.status(404).json({ message: 'Courrier non trouvé' });
        }
        await courier.destroy();
        res.status(200).json({ message: 'Courrier supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du courrier' });
    }
}

export const searchCouriers = async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Le paramètre de recherche (query) est requis.' });
        }
        const whereConditions = {
            [Op.or]: [
                { objet: { [Op.iLike]: `%${query}%` } },
                { numero_courrier: { [Op.iLike]: `%${query}%` } },
                { nature: { [Op.iLike]: `%${query}%` } },
                { contenu: { [Op.iLike]: `%${query}%` } }
            ]
        };
        const dateQuery = new Date(query);
        if (!isNaN(dateQuery.getTime())) { 
            const startOfDay = new Date(dateQuery);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(dateQuery);
            endOfDay.setHours(23, 59, 59, 999);

            whereConditions[Op.or].push({
                date_envoi: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            });
        };
        const couriers = await Courrier.findAll({
            where: whereConditions
        });
        res.status(200).json(couriers);
    } catch (error) {
        console.error('Erreur lors de la recherche des courriers:', error);
        res.status(500).json({ message: 'Erreur lors de la recherche des courriers' });
    }
}
