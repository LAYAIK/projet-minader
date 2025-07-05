import { getAllPersonnel, getPersonnelById, updatePersonnel, deletePersonnel, createPersonnel,searchPersonnel } from "../controllers/personnelController.js";
import express from "express";

/**
 * @swagger
 * /api/personnels/{id}:
 *   put:
 *     summary: Met à jour les informations d'un personnel existant
 *     tags:
 *       - Personnels
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID du personnel à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               noms:
 *                 type: string
 *                 description: Nom du personnel
 *               prenoms:
 *                 type: string
 *                 description: Prénom(s) du personnel
 *               adresse_email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email du personnel
 *               telephone:
 *                 type: string
 *                 description: Numéro de téléphone du personnel
 *               date_embauche:
 *                 type: string
 *                 format: date
 *                 description: Date d'embauche du personnel
 *               date_naissance:
 *                 type: string
 *                 format: date
 *                 description: Date de naissance du personnel
 *     responses:
 *       200:
 *         description: Personnel mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personnel'
 *       404:
 *         description: Personnel non trouvé
 *       500:
 *         description: Erreur lors de la mise à jour du personnel
 *
 * 
 *   get:
 *     summary: Récupérer un personnel par son identifiant
 *     description: Retourne les informations d'un personnel spécifique à partir de son identifiant.
 *     tags:
 *       - Personnels
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Identifiant unique du personnel
 *     responses:
 *       200:
 *         description: Informations du personnel récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personnel'
 *       404:
 *         description: Personnel non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Personnel non trouvé
 *       500:
 *         description: Erreur lors de la récupération du personnel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erreur lors de la récupération du personnel
 * 
 *   delete:
 *     summary: Supprimer un personnel par ID
 *     description: Supprime un membre du personnel existant à partir de son identifiant.
 *     tags:
 *       - Personnels
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID du personnel à supprimer
 *     responses:
 *       204:
 *         description: Personnel supprimé avec succès (aucun contenu retourné)
 *       404:
 *         description: Personnel non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Personnel non trouvé
 *       500:
 *         description: Erreur lors de la suppression du personnel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erreur lors de la suppression du personnel
 *
 * /api/personnels:
 *   get:
 *     summary: Récupère la liste de tout le personnel
 *     description: Retourne un tableau contenant tous les membres du personnel.
 *     tags:
 *       - Personnels
 *     responses:
 *       200:
 *         description: Liste du personnel récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Personnel'
 *       404:
 *         description: Aucun personnel trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Aucun personnel trouvé
 *       500:
 *         description: Erreur lors de la récupération du personnel
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erreur lors de la récupération du personnel
 *
 *
 *   post:
 *     summary: Crée un nouveau personnel
 *     description: Ajoute un nouveau membre du personnel à la base de données.
 *     tags:
 *       - Personnels
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - noms
 *               - matricule
 *               - date_embauche
 *               - adresse_email
 *               - telephone
 *             properties:
 *               noms:
 *                 type: string
 *                 description: Nom(s) du personnel
 *               prenoms:
 *                 type: string
 *                 description: Prénom(s) du personnel
 *               adresse_email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email du personnel
 *               telephone:
 *                 type: string
 *                 description: Numéro de téléphone du personnel
 *               matricule:
 *                 type: string
 *                 description: Matricule du personnel
 *               date_embauche:
 *                 type: string
 *                 format: date
 *                 description: Date d'embauche du personnel (YYYY-MM-DD)
 *               date_naissance:
 *                 type: string
 *                 format: date
 *                 description: Date de naissance du personnel (YYYY-MM-DD)
 *     responses:
 *       201:
 *         description: Personnel créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personnel'
 *       400:
 *         description: Données manquantes ou invalides
 *       500:
 *         description: Erreur lors de la création du personnel
 * 
 * /api/personnels/search:
 *   get:
 *     summary: Recherche du personnel par nom, adresse email ou matricule
 *     description: Recherche les membres du personnel dont le nom, l'adresse email ou le matricule correspondent à la requête.
 *     tags:
 *       - Personnels
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Terme de recherche à utiliser pour filtrer le personnel.
 *     responses:
 *       200:
 *         description: Liste des membres du personnel trouvés.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Personnel'
 *       404:
 *         description: Aucun personnel trouvé pour cette recherche.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Aucun personnel trouvé pour cette recherche
 *       500:
 *         description: Erreur lors de la recherche du personnel.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Erreur lors de la recherche du personnel
 */


const router = express.Router();

router.route('/api/personnels')
    .get(getAllPersonnel)
    .post(createPersonnel);

router.route('/api/personnels/search')
    .get(searchPersonnel);

router.route('/api/personnels/:id')
    .get(getPersonnelById)
    .put(updatePersonnel)
    .delete(deletePersonnel);

const personnelRoutes = router;
export default personnelRoutes