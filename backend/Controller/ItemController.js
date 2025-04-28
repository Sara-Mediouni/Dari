const Image = require("../model/Image");
const Item = require("../model/Item");
const { setImage } = require("./ImageController"); // Importer la fonction du contrôleur image
     


const getAllItems=async(req,res)=>{
  try {
    const { category, page = 1, limit = 6 } = req.query; // Récupération des paramètres de requête
    const skip = (page - 1) * limit; // Nombre d'éléments à ignorer pour la pagination

    // Requête pour récupérer les items avec le filtre de catégorie (si fourni) et la pagination
    const query = category ? { category: category } : {}; // Si une catégorie est spécifiée, filtre sur celle-ci
    const items = await Item.find(query)
      .skip(skip)
      .limit(parseInt(limit)) // Limiter les résultats à la valeur de "limit"
      .exec();

    // Calcul du nombre total de pages
    const totalItems = await Item.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    // Retour des items et du total de pages
    res.status(200).json({
      items,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving items' });
  }
}
const setItem = async (req, res) => {
  try {
    if (!req.file || !req.file.filename) {
      return res.status(400).send("No image uploaded");
    }

    // Validation des champs requis
    const { item, price, category } = req.body;

    if (!item || item.trim() === "") {
      return res.status(400).send("Item name is required");
    }

    if (!price || isNaN(price) || price <= 0) {
      return res.status(400).send("Price must be a positive number");
    }

    if (!category || category.trim() === "") {
      return res.status(400).send("Category is required");
    }

    const newItem = new Item({
      item,
      price,
      image: req.file.filename,
      category,
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
    const { id } = req.params;

    // Validation de l'ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Invalid item ID format");
    }

    const item = await Item.findById(id).populate("image");
    if (!item) {
      return res.status(404).send("Item not found");
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while retrieving item");
  }
};


const findByCategory = async (req, res) => {
  try {
    const categoryquery = req.query.category;

    // Validation de la catégorie
    if (!categoryquery || categoryquery.trim() === "") {
      return res.status(400).send("Category is required");
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    // Assurer que les valeurs sont positives
    if (page < 1 || limit < 1) {
      return res.status(400).json({ error: "Page and limit must be greater than 0." });
    }

    const skip = (page - 1) * limit;

    const totalItems = await Item.countDocuments({ category: categoryquery });

    const items = await Item.find({ category: categoryquery })
      .skip(skip)
      .limit(limit)
      .populate("image");

    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).json({
      items,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error while retrieving items by category");
  }
};


const deleteItemById = async (req, res) => {
  try {
    const id = req.params.id;

    // Validation de l'ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).send("Invalid item ID format");
    }

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
