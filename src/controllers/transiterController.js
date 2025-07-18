import { Op } from 'sequelize';
import db from '../models/index.js';    
const { Transiter } = db;

// Create a new transition
export const createTransition = async (req, res) => {
    try {
        const { date_transition, description,id_status, id_courrier,id_priorite,
            id_objet,id_role,id_structure_destinataire,id_document,id_note,id_structure_expediteur } = req.body;
        if (!date_transition || !id_courrier || !id_structure_destinataire) {
            return res.status(400).json({ message: 'remplir tous les champs' });
        }
        const transition = await Transiter.create({ date_transition,id_structure_destinataire });
        if (description) transition.description = description;
        if (id_status) transition.id_status = id_status;
        if (id_priorite) transition.id_priorite = id_priorite;
        if (id_objet) transition.id_objet = id_objet;
        if (id_role) transition.id_role = id_role;
        if (id_document) transition.id_document = id_document;
        if (id_note) transition.id_note = id_note;
        if (id_structure_expediteur) transition.id_structure_expediteur = id_structure_expediteur;
        if (id_courrier) transition.id_courrier = id_courrier;
        await transition.save();
        res.status(201).json({ message: 'Courrier transiter avec success', transition });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la creation de la transition' });
    }
};

// Get all transitions
export const getAllTransitions = async (req, res) => {
    try {
        const transitions = await Transiter.findAll();
        if (transitions.length === 0) {
            return res.status(404).json({ message: 'Aucune transition trouvee' });
        }
        res.status(200).json(transitions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la recuperation des transitions' });
    }
};

// Get a specific transition by ID
export const getTransitionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transition = await Transiter.findByPk(id);
        if (!transition) {
            return res.status(404).json({ message: 'Le transition n\'a pas été trouvée' });
        }
        res.status(200).json(transition);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la recuperation du transition' });
    }
};

// Update a transition by ID
export const updateTransition = async (req, res) => {
    try {
        const { id } = req.params;
        const { date_transition, description,id_status, id_courrier,id_priorite,
            id_objet,id_role,id_structure_destinataire,id_document,id_note,id_structure_expediteur } = req.body;
        const transition = await Transiter.findByPk(id);
        if (!transition) {
            return res.status(404).json({ message: 'La transition n\'a pas été trouvée avec cet ID' });
        }
        if (date_transition) transition.date_transition = date_transition;
        if (description) transition.description = description;
        if (id_status) transition.id_status = id_status;
        if (id_courrier) transition.id_courrier = id_courrier;
        if (id_priorite) transition.id_priorite = id_priorite;
        if (id_objet) transition.id_objet = id_objet;
        if (id_role) transition.id_role = id_role;
        if (id_structure_destinataire) transition.id_structure_destinataire = id_structure_destinataire;
        if (id_document) transition.id_document = id_document;
        if (id_note) transition.id_note = id_note;
        if (id_structure_expediteur) transition.id_structure_expediteur = id_structure_expediteur;
        await transition.save();
        res.status(200).json({ message: 'Le Courrier transiter a ete mis a jour', transition });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du transition' });
    }
};

// Delete a transition by ID
export const deleteTransition = async (req, res) => {
    try {
        const { id } = req.params;
        const transition = await Transiter.findByPk(id);
        if (!transition) {
            return res.status(404).json({ message: 'Aucune transition trouvee avec cet ID' });
        }
        await transition.destroy();
        res.status(200).json({ message: 'Transition supprimee avec success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du transition' });
    }
};

