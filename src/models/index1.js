// src/models/index.js
import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// Assurez-vous que le chemin vers votre config.json est correct
// Si vous utilisez les modules ES et que vous voulez lire du JSON, vous pourriez avoir besoin de cela:
//const config = await import(path.join(__dirname, '/../config/config.json'), { assert: { type: 'json' } }).then(m => m.default[env]);

const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: config.dialect,
        logging: false // Désactive le logging SQL par défaut
    });
}

// Lit tous les fichiers de modèle et les importe
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(async (file) => {
        // Pour les modules ES, assurez-vous que le modèle est exporté par défaut
        const model = await import(path.join(__dirname, file)).then(m => m.default(sequelize, DataTypes));
        db[model.name] = model; // Le nom du modèle (ex: 'Conversation') est utilisé comme clé
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Exportez l'objet db par défaut
export default db;