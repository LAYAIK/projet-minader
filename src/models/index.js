// src/models/index.js
import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';

// Importation de tous les modèles
import Structure from './StructureModel.js';
import Courrier from './CourrierModel.js';
import Note from './NoteModel.js';
import Document from './DocumentModel.js';
import Utilisateur from './UtilisateurModel.js';
//import TypeCourrier from './TypeCourrierModel.js';
import Personnel from './PersonnelModel.js';
import TypePersonnel from './TypePersonnelModel.js';
import Archive from './ArchiveModel.js';
import Role from './RoleModel.js';
import Transiter from './TransiterModel.js'; // La table de jonction explicite
import Conversation from './ConversationModel.js';
import Message from './MessageModel.js';
import ConversationParticipant from './ConversationParticipantModel.js'; // Modèle pour les participants de conversation

// --- Définition des Associations ---

// Utilisateur - Structure (Appartenir)
// 1 Utilisateur appartient à 1 Structure (1..1 côté Utilisateur)
// 1 Structure peut avoir plusieurs Utilisateurs (1..* côté Structure)
Structure.hasMany(Utilisateur, { foreignKey: 'id_structure', as: 'utilisateurs' });
Utilisateur.belongsTo(Structure, { foreignKey: 'id_structure', as: 'structure_appartenance' });

// Utilisateur - Courrier (Envoyer)
// 1 Utilisateur peut envoyer plusieurs Courriers (1..* côté Courrier)
// 1 Courrier est envoyé par plusieurs Utilisateur (1..* côté Utilisateur)
Utilisateur.hasMany(Courrier, { foreignKey: 'id_expediteur', as: 'courriers_envoyes' });
Courrier.hasMany(Utilisateur, { foreignKey: 'id_expediteur', as: 'destinataires' });

// Courrier - Note (Contenir)
// 1 Courrier peut contenir plusieurs Notes (1..* côté Note)
// 1 Note appartient à 1 Courrier (0..* côté Note -> 1 Courrier)
Courrier.hasMany(Note, { foreignKey: 'id_courrier', as: 'notes' });
Note.belongsTo(Courrier, { foreignKey: 'id_courrier', as: 'courrier_contenant' });

// Courrier - Pièce_jointe (Posseder)
// 1 Courrier peut posséder plusieurs Pièces_jointes (0..* côté Pièce_jointe)
// 1 Pièce_jointe appartient à 1 Courrier (1..1 côté Pièce_jointe -> 1 Courrier)
Courrier.hasMany(Document, { foreignKey: 'id_courrier', as: 'documents' });
Document.belongsTo(Courrier, { foreignKey: 'id_courrier', as: 'courrier_parent' });

// Courrier - Type_courrier (Relation simple, type du courrier)
// 1 Type_courrier peut être associé à plusieurs Courriers
// 1 Courrier est d'un seul Type_courrier
// TypeCourrier.hasMany(Courrier, { foreignKey: 'id_type_courrier', as: 'courriers_de_ce_type' });
// Courrier.belongsTo(TypeCourrier, { foreignKey: 'id_type_courrier', as: 'type_de_courrier' });

// Pièce_jointe - Type_courrier (Posseder)
// 1 Type_courrier peut être associé à plusieurs Pièces_jointes (0..* côté Pièce_jointe)
// 1 Pièce_jointe est d'un seul Type_courrier
// TypeCourrier.hasMany(Document, { foreignKey: 'id_type_courrier', as: 'documents_de_ce_type' });
// Document.belongsTo(TypeCourrier, { foreignKey: 'id_type_courrier', as: 'type_de_document' });


// Personnel - Type_Personnel (Avoir)
// 1 Type_Personnel peut avoir plusieurs Personnels
// 1 Personnel est d'un seul Type_Personnel
TypePersonnel.hasMany(Personnel, { foreignKey: 'id_type_personnel', as: 'personnels_de_ce_type' });
Personnel.belongsTo(TypePersonnel, { foreignKey: 'id_type_personnel', as: 'type_de_personnel' });

// Personnel - Structure (Disposer)
// 1 Structure peut disposer de plusieurs Personnels
// 1 Personnel dispose d'une seule Structure
Structure.hasMany(Personnel, { foreignKey: 'id_structure', as: 'personnels_disposant' });
Personnel.belongsTo(Structure, { foreignKey: 'id_structure', as: 'structure_disposant' });


// Structure - Courrier (Transiter) - Relation Many-to-Many via la table Transiter
// Une structure peut transiter plusieurs courriers, et un courrier peut transiter par plusieurs structures
Structure.belongsToMany(Courrier, { through: Transiter, foreignKey: 'id_structure', as: 'courriers_transites' });
Courrier.belongsToMany(Structure, { through: Transiter, foreignKey: 'id_courrier', as: 'structures_de_transit' });

// Associations pour la table de jonction Transiter elle-même (pour accéder aux attributs de la jonction)
Transiter.belongsTo(Structure, { foreignKey: 'id_structure', as: 'structure_de_transit' });
Transiter.belongsTo(Courrier, { foreignKey: 'id_courrier', as: 'courrier_transite' });

// Messagerie - Utilisateur (Relation entre expéditeur et destinataire)
Utilisateur.hasMany(Message, { foreignKey: 'id_expediteur', as: 'messages_envoyes' });
Utilisateur.hasMany(Message, { foreignKey: 'id_destinataire', as: 'messages_recus' });

// Archive - Courrier (Relation d'archivage)
// 1 Archive peut avoir plusieurs Courriers
// 1 Courrier peut avoir une seule Archive
Archive.hasMany(Courrier, { foreignKey: 'id_courrier', as: 'courriers_archives' });
Courrier.belongsTo(Archive, { foreignKey: 'id_courrier', as: 'archive_associee' });

// Archive - Utilisateur 
// 1 Archive peut être associée à un Utilisateur (si le personnel est aussi un utilisateur)
// 1 Utilisateur peut avoir plusieurs Archives
Archive.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur', as: 'utilisateur_archivant' });
Utilisateur.hasMany(Archive, { foreignKey: 'id_utilisateur', as: 'archives_utilisateur' });

// Role - Utilisateur (Relation de rôle)
// 1 Role peut être associé à plusieurs Utilisateurs
// 1 Utilisateur peut avoir plusieurs Roles
Role.hasMany(Utilisateur, { foreignKey: 'id_role', as: 'utilisateurs_de_ce_role' });
Utilisateur.belongsTo(Role, { foreignKey: 'id_role', as: 'role_de_l_utilisateur' });

// Courrier.hasMany(Conversation, { foreignKey: 'id_courrier', as: 'conversations_associees' });

// Conversation.belongsTo(Courrier, { foreignKey: 'id_courrier', as: 'courrier' });

// Conversation.hasMany(Message, { foreignKey: 'id_conversation', as: 'messages' });

// Message.belongsTo(Conversation, { foreignKey: 'id_conversation', as: 'conversation_associee' });

// Utilisateur.hasMany(Message, { foreignKey: 'id_expediteur', as: 'expediteur_messages' });

// Message.belongsTo(Utilisateur, { foreignKey: 'id_expediteur', as: 'expediteur' });

// Conversation.belongsToMany(Utilisateur, { through: ConversationParticipant, foreignKey: 'id_conversation', as: 'participants' });

// Utilisateur.belongsToMany(Conversation, { through: ConversationParticipant, foreignKey: 'id_utilisateur', as: 'conversations' });

const db = {};

db.sequelize = sequelize;
db.Sequelize = DataTypes; // Renommez DataTypes pour éviter la confusion avec Sequelize principal

// Initialisez les modèles
db.Utilisateur = Utilisateur;
db.Courrier = Courrier;
db.Conversation = Conversation;
db.Message = Message;
db.ConversationParticipant = ConversationParticipant;

// Définissez les associations
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Associations spécifiques
// Utilisateur et Conversation (via ConversationParticipant)
db.Utilisateur.belongsToMany(db.Conversation, {
    through: db.ConversationParticipant,
    foreignKey: 'id_utilisateur',
    otherKey: 'id_conversation',
    as: 'userConversations' // Alias pour l'inclusion des conversations d'un utilisateur
});
db.Conversation.belongsToMany(db.Utilisateur, {
    through: db.ConversationParticipant,
    foreignKey: 'id_conversation',
    otherKey: 'id_utilisateur',
    as: 'members' // Alias pour l'inclusion des participants d'une conversation
});

// ConversationParticipant
db.ConversationParticipant.belongsTo(db.Conversation, {
    foreignKey: 'id_conversation',
    as: 'conversation'
});
db.ConversationParticipant.belongsTo(db.Utilisateur, {
    foreignKey: 'id_utilisateur',
    as: 'utilisateurDetail' // Alias pour accéder aux détails de l'utilisateur depuis la table de jonction
});

// Message et Conversation
db.Conversation.hasMany(db.Message, {
    foreignKey: 'id_conversation',
    as: 'messages'
});
db.Message.belongsTo(db.Conversation, {
    foreignKey: 'id_conversation',
    as: 'conversation'
});

// Message et Expediteur (Utilisateur)
db.Utilisateur.hasMany(db.Message, {
    foreignKey: 'id_expediteur',
    as: 'sentMessages' // Alias pour les messages envoyés par un utilisateur
});
db.Message.belongsTo(db.Utilisateur, {
    foreignKey: 'id_expediteur',
    as: 'expediteur' // Alias pour l'expéditeur d'un message
});

// Conversation et Courrier
db.Courrier.hasOne(db.Conversation, {
    foreignKey: 'id_courrier',
    as: 'conversationAssociee'
});
db.Conversation.belongsTo(db.Courrier, {
    foreignKey: 'id_courrier',
    as: 'courrier_associe' // Alias pour le courrier associé à une conversation
});




// Exportation de l'instance sequelize et de tous les modèles
export default{
  sequelize,
  Structure,
  Courrier,
  Note,
  Document,
  Utilisateur,
  //TypeCourrier,
  Personnel,
  TypePersonnel,
  Transiter,
  Archive,
  Role,
  Conversation,
  Message,
  ConversationParticipant,
  db // Exportez l'objet db contenant tous les modèles et associations
};