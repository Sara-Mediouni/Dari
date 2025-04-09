const mongoose = require("mongoose");


const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true ,unique:true}, // Nom du fichier
  contentType: { type: String, required: true },
  path: { type: String, required: true } // Contenu binaire de l'image
});

// Création du modèle Image
const Image = mongoose.model("Image", imageSchema);

module.exports = Image;