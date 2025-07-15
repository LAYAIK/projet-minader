// seed.js
import db from '../models/index.js'; // Adjust path
import { v4 as uuidv4 } from 'uuid'; // npm install uuid

async function seedData() {
    try {
        await db.sequelize.sync({ alter: true }); // Ensure tables are synced first
        console.log('Database synced for seeding.');

        // Create a sample Structure if it doesn't exist
        let structure = await db.Structure.findOne({ where: { nom: 'Direction Générale' } });
        if (!structure) {
            structure = await db.Structure.create({
                id_structure: uuidv4(), // Generate a new UUID
                nom: 'Direction Générale',
                description: 'Description de la Direction Générale',
                date_transite: new Date(),
                // ... other required fields for Structure
            });
            console.log('Sample Structure created:', structure.nom);
        } else {
            console.log('Sample Structure already exists:', structure.nom);
        }

        // Now create a Courrier using the ID of the created/existing Structure
        // You can use this ID in your Postman/API request body
        console.log(`Use this Structure ID for Courrier creation: ${structure.id_structure}`);

        // Example of creating a Courier using the structure.id_structure
        const courier = await db.Courrier.create({
            objet: "Demande de fournitures",
            contenu: "Veuillez approuver la demande...",
            numero_courrier: `C${Date.now()}`,
            id_structure: structure.id_structure,
            // ... other required fields for Courrier
        });
        console.log('Sample Courrier created:', courier.numero_courrier);


    } catch (error) {
        console.error('Error during seeding:', error);
    } finally {
        await db.sequelize.close();
    }
}

seedData();