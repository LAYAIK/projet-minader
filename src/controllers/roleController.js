import db from '../models/index.js';
const { Role } = db;
export const createRole = async(req, res) => {
    try{
      const { nom, description } = req.body;
      if (!nom) {
          return res.status(400).json({ message: 'Nom  requis' });
      }
      const role = await Role.create({ nom });
      if(description) role.description = description;
      await role.save();

      res.status(201).json({ message: 'Rôle créé avec succès', role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la création du rôle' });
    }
}

export const getAllRoles = async(req, res) => {
    try {
        const roles = await Role.findAll();
        if (roles.length === 0) {
            return res.status(404).json({ message: 'Aucun rôle trouvé' });
        }
        res.status(200).json(roles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des rôles' });
    }
}

export const getRoleById = async(req, res) => { 
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ message: 'Rôle non trouvé' });
        }
        res.status(200).json(role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du rôle' });
    }
} 

export const updateRole = async(req, res) => {
    try {
        const { id } = req.params;
        const { nom, description } = req.body;
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ message: 'Rôle non trouvé' });
        }
        if (nom) role.nom = nom;
        if (description) role.description = description;
        await role.save();
        res.status(200).json({ message: 'Rôle mis à jour avec succès', role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du rôle' });
    }
}

export const deleteRole = async(req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findByPk(id);
        if (!role) {
            return res.status(404).json({ message: 'Rôle non trouvé' });
        }
        await role.destroy();
        res.status(200).json({ message: 'Rôle supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du rôle' });
    }
}


