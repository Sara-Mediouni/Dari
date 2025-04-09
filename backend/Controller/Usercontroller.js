// Route d'inscription

const User = require("../model/User");
const bcrypt = require("bcryptjs");
const firebaseAdmin = require('firebase-admin');

const serviceAccount = require("./dari-28cfd-firebase-adminsdk-fbsvc-19a4019b91.json"); // Remplace par ton fichier JSON de la clé de service
const Command = require("../model/Commande");

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
  })

  const SignUp = async (req, res) => {
    try {
      const { name, email, password, uid } = req.body;
      console.log('Données reçues:', req.body);
  
      // Vérification si l'email est déjà utilisé
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('Utilisateur déjà existant:', existingUser);
        return res.status(400).json({ message: "Email déjà utilisé" });
      }
  
      // Création d'un nouvel utilisateur
      const newUser = new User({
        name,
        email,
        password,
        uid
      });
  
      console.log('Nouvel utilisateur à enregistrer:', newUser);
      
      // Sauvegarde dans MongoDB
      await newUser.save();
  
      console.log('Utilisateur sauvegardé avec succès:', newUser);
      res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement dans MongoDB:', error);
      res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
    }
  };

  const addOrderToUser = async (req, res) => {
    try {
        // Récupération des paramètres depuis l'URL
        const { uid, id } = req.params;

        // Recherche de l'utilisateur par son UID
        const user = await User.findOne({ uid });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Recherche de la commande par son ID
        const order = await Command.findById(id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Ajout de la commande à la liste des commandes de l'utilisateur
        user.commande.push(order._id);  // Assurez-vous que "commande" est un tableau d'ObjectId
        await user.save(); // Sauvegarde de l'utilisateur

        return res.status(200).json({ message: "Order added successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};


  module.exports= {SignUp, addOrderToUser}