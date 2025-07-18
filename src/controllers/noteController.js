import { Op } from 'sequelize';
import db from '../models/index.js';
const { Note } = db;

export const getAllNotesController = async (req, res) => {
    try {
        const notes = await Note.findAll();
        if (notes.length === 0) {
            return res.status(404).json({ message: 'Aucune note trouvée' });
        }
        res.status(200).json({ notes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des notes' });
    }
};

export const getNoteByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findOne({ where: { id_note : id } });
        if (!note) {
            return res.status(404).json({ message: 'Note non trouvée' });
        }
        res.status(200).json({ note });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la note' });
    }
};

export const createNoteController = async (req, res) => {
    try {
        const { note, id_courrier } = req.body;
        if (!note) {
            return res.status(400).json({ message: 'La note est requise' });
        }
        const newNote = await Note.create({ note });
        if (id_courrier) newNote.id_courrier = id_courrier;
        await newNote.save();
        res.status(201).json({ message: 'Note créée avec succès', note: newNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création de la note' });
    }
};

export const updateNoteController = async (req, res) => {
    try {
        const { id } = req.params;
        const { note, id_courrier } = req.body;
        const noteToUpdate = await Note.findByPk(id);
        if (!noteToUpdate) {
            return res.status(404).json({ message: 'Note non trouvée' });
        }
        if (note) noteToUpdate.note = note;
        if (id_courrier) noteToUpdate.id_courrier = id_courrier;
        await noteToUpdate.save();
        const updatedNote = await Note.findByPk(id);
        res.status(200).json({ message: 'Note mise à jour avec succès', note: updatedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la note' });
    }
};

export const deleteNoteController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRows = await Note.destroy({ where: { id_note : id } });
        if (deletedRows === 0) {
            return res.status(400).json({ message: "Aucune note supprimée" });
        }
        res.status(200).json({ message: 'Note supprimée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la note' });
    }
};
