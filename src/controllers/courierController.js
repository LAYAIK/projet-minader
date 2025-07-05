import Courrier from "../models/CourrierModel.js";
import { Op } from "sequelize";



export const getAllCouriers = async (req, res) => {
    try {
        const couriers = await Courrier.findAll();
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
        const { objet, date_depot, numero_courrier, nature, id_receveurs, status,id_expediteur,} = req.body;
        if (!objet || !date_depot || !numero_courrier) {
            return res.status(400).json({ message: 'Tous les champs sont requis' });
        }
        const existingCourier = await Courrier.findOne({ where: { numero_courrier } });
        if (existingCourier) {
            return res.status(400).json({ message: 'Un courrier avec ce numéro de courrier existe deja' });
        }
        const newCourier = await Courrier.create({ objet, date_depot, numero_courrier, nature, status, id_expediteur,});

        if (id_receveurs && Array.isArray(id_receveurs)) {  
            await newCourier.setReceveurs(id_receveurs);
        }
        res.status(201).json(newCourier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du courrier' });
    }
}

export const updateCourier = async (req, res) => {
    try {
        const { id } = req.params;
        const { objet, date_depot, numero_courrier, nature } = req.body;
        const courier = await Courrier.findByPk(id);
        if (!courier) {
            return res.status(404).json({ message: 'Courrier non trouvé' });
        }
        courier.objet = objet || courier.objet;
        courier.date_depot = date_depot || courier.date_depot;
        courier.numero_courrier = numero_courrier || courier.numero_courrier;
        courier.nature = nature || courier.nature;
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
                { nature: { [Op.iLike]: `%${query}%` } }
            ]
        };
        const dateQuery = new Date(query);
        if (!isNaN(dateQuery.getTime())) { 
            const startOfDay = new Date(dateQuery);
            startOfDay.setHours(0, 0, 0, 0);

            const endOfDay = new Date(dateQuery);
            endOfDay.setHours(23, 59, 59, 999);

            whereConditions[Op.or].push({
                date_depot: {
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
