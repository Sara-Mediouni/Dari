const Image = require("../model/Image");
const Item = require("../model/Item");
const { setImage } = require("./ImageController"); // Importer la fonction du contrôleur image

const setItem = async (req, res) => {
  try {
    if (!req.file.filename) {
      return res.status(400).send("No image uploaded");
    }

   
   

    const newItem = new Item({
      item: req.body.item,
      price: req.body.price,
      image: req.file.filename,
      category: req.body.category,
    });

    const savedItem = await newItem.save();
    console.log("✅ Item saved:", savedItem);
    return res.status(201).send("Item added successfully");
  } catch (error) {
    console.error("❌ Error while adding Item:", error);
    return res.status(500).send("Error while adding Item");
  }
};

const getItem = async (req, res) => {
  try {
    console.log(req.params.id);
    const item = await Item.findById(req.params.id).populate("image"); // 🔥 Ajout de `populate` pour récupérer l’image
    if (!item) {
      return res.status(404).send("Item not found");
    }
    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while retrieving item");
  }
};

const getAllItems = async (req, res) => {
  try {
    // Récupérer les paramètres de page et de limite depuis la requête avec une validation
    const page = parseInt(req.query.page) || 1; // Page par défaut à 1
    const limit = parseInt(req.query.limit) || 6; // Limite par défaut à 6

    // Assurer que les valeurs sont positives
    if (page < 1 || limit < 1) {
      return res
        .status(400)
        .json({ error: "Page and limit must be greater than 0." });
    }

    const skip = (page - 1) * limit; // Calculer le nombre d'éléments à ignorer pour la pagination

    // Calculer le nombre total de pâtisseries
    const totalItems = await Item.countDocuments();

    // Récupérer les pâtisseries avec pagination et leur image associée
    const items = await Item.find().skip(skip).limit(limit).populate("image"); // Assure-toi que "image" est bien une référence dans ton modèle Mongoose

    // Calculer le nombre total de pages
    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      items,
      totalPages, // Nombre total de pages
      currentPage: page, // Page actuelle
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error while getting items");
  }
};
const findByCategory = async (req, res) => {
  try {
    const categoryquery = req.query.category;
    // Récupérer les paramètres de page et de limite depuis la requête avec une validation
    const page = parseInt(req.query.page) || 1; // Page par défaut à 1
    const limit = parseInt(req.query.limit) || 6; // Limite par défaut à 6
    console.log(categoryquery);
    // Assurer que les valeurs sont positives
    if (page < 1 || limit < 1) {
      return res
        .status(400)
        .json({ error: "Page and limit must be greater than 0." });
    }

    const skip = (page - 1) * limit; // Calculer le nombre d'éléments à ignorer pour la pagination

    // Calculer le nombre total de pâtisseries
    const totalItems = await Item.countDocuments();

    // Récupérer les pâtisseries avec pagination et leur image associée
    const items = await Item.find({ category: categoryquery })
      .skip(skip)
      .limit(limit)
      .populate("image"); // Assure-toi que "image" est bien une référence dans ton modèle Mongoose

    // Calculer le nombre total de pages
    const totalPages = Math.ceil(totalItems / limit);
    console.log(items)
    res.status(200).json({
      items,
      totalPages, // Nombre total de pages
      currentPage: page, // Page actuelle
    });
  } catch (error) {
    return res.status(500).send("Item deleted successfully");
  }
};

const deleteItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).send("Item not found");
    }

    

    await Item.findByIdAndDelete(id);
    return res.status(200).send("Item deleted successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error while deleting item");
  }
};

module.exports = {
  setItem,
  findByCategory,
  getAllItems,
  getItem,
  deleteItemById,
};
