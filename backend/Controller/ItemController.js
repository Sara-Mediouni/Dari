const Image = require("../model/Image");
const Item = require("../model/Item");
const { setImage } = require("./ImageController"); // Importer la fonction du contrôleur image
     


const getAllItems=async(req,res)=>{
  try {
    const { category, page, limit } = req.query; // Ne pas mettre de valeur par défaut ici
    const query = category ? { category } : {}; // Filtre par catégorie si elle existe
  
    let items;
  
    if (page && limit) {
      const skip = (parseInt(page) - 1) * parseInt(limit);
  
      items = await Item.find(query)
        .skip(skip)
        .limit(parseInt(limit))
        .exec();
  
      const totalItems = await Item.countDocuments(query);
      const totalPages = Math.ceil(totalItems / parseInt(limit));
  
      res.status(200).json({
        items,
        totalPages,
      });
    } else {
      // Si page et limit ne sont pas définis, retourner tous les items sans pagination
      items = await Item.find(query).exec();
  
      res.status(200).json({
        items,
        totalPages: 1, // 1 seule page vu qu'on affiche tout
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving items' });
  }
}  
const setItem = async (req, res) => {
  try {
    console.log("Received new item:", req.body);

    if (!req.file || !req.file.filename) {
      console.log("No image uploaded");
      return res.status(400).send("No image uploaded");
    }

    const { item, price, category, description } = req.body;

    if (!item || item.trim() === "") {
      console.log("Item name missing");
      return res.status(400).send("Item name is required");
    }

    if (!price || isNaN(price) || price <= 0) {
      console.log("Invalid price");
      return res.status(400).send("Price must be a positive number");
    }

    if (!category || category.trim() === "") {
      console.log("Category missing");
      return res.status(400).send("Category is required");
    }

    const newItem = new Item({
      item,
      price,
      image: req.file.filename,
      description,
      category,
    });

    await newItem.save();
    console.log("Item saved successfully");

    return res.status(201).json({ success: true, message: "Item added successfully" });
  } catch (error) {
    console.error("Error saving item:", error);
    return res.status(500).json({ success: false, message: "Error while adding Item", error: error.message });
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
