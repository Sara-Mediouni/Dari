const User = require("../model/User");
const bcrypt = require("bcryptjs");
const firebaseAdmin = require('firebase-admin');
const Command = require("../model/Commande");
const serviceAccount = require("./dari-28cfd-firebase-adminsdk-fbsvc-19a4019b91.json");

// Initialisation de Firebase Admin
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

// Contrôleur d'inscription
const SignUp = async (req, res) => {
  try {
    const { name, email, password, uid } = req.body;
    console.log('📥 Données reçues:', req.body);

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️ Utilisateur déjà existant:', existingUser);
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Hash du mot de passe (optionnel si tu veux renforcer la sécurité même si Firebase est utilisé)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du nouvel utilisateur
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Sauvegarde du mot de passe hashé
      uid
    });

    console.log('🆕 Nouvel utilisateur à enregistrer:', newUser);

    // Sauvegarde dans la base de données
    await newUser.save();

    console.log('✅ Utilisateur sauvegardé avec succès:', newUser);
    res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });

  } catch (error) {
    console.error('❌ Erreur lors de l\'enregistrement:', error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};

// Contrôleur pour ajouter une commande à un utilisateur
const addOrderToUser = async (req, res) => {
  try {
    const { uid, id } = req.params;

    // Trouver l'utilisateur par son UID
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Trouver la commande par son ID
    const order = await Command.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    // Ajouter la commande au tableau des commandes de l'utilisateur
    user.commande.push(order._id); // Assure-toi que "commande" est bien un tableau de type [ObjectId] dans ton modèle
    await user.save();

    return res.status(200).json({ message: "Commande ajoutée avec succès à l'utilisateur" });

  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout de la commande:', error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};

module.exports = { SignUp, addOrderToUser };
