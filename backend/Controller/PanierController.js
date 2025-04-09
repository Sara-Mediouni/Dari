const express = require('express');
const router = express.Router();
const Panier = require('../model/Cart'); // Si tu as un modèle Product pour les articles
const Pastry = require('../model/Item');
const mongoose=require('mongoose');
const Item = require('../model/Item');

// Ajouter un article au panier
const createCart = async (req, res) => {
  const { userId, items} = req.body;

  try {
    let panier = await Panier.findOne({ user: userId });
    if (!panier) {
      panier = new Panier({ user: userId, items: [], totalPrice: 0 });
    }

    // Vider les anciens items (optionnel)
    panier.items = [];

    let totalPrice = 0;

    for (const item of items) {
      const product = await Item.findById(item.productId);
      if (!product) continue;

      const TotalPriceItem = product.price * item.quantity;

      panier.items.push({
        item: product._id,
        quantity: item.quantity,
        TotalPriceItem,
      });

      totalPrice += TotalPriceItem;
    }

    panier.totalPrice = totalPrice;
    await panier.save();

    res.status(200).json({ message: "Panier synchronisé avec succès", panier });
  } catch (error) {
    console.error("❌ Erreur de synchronisation :", error);
    res.status(500).json({ message: "Erreur de synchronisation du panier" });
  }
};


// Récupérer le panier de l'utilisateur
const findCart= async (req, res) => {
    const { userId } = req.params;
  
    try {
      const panier = await Panier.find({ user: userId }).populate({
        path: 'items.item',
        populate: { path: 'image' }
      }); // Populate pour récupérer les infos du produit
      if (!panier) {
        return res.status(404).json({ message: 'Panier vide ou non trouvé' });
      }
  
      res.status(200).json({ panier });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération du panier' });
    }
  };
  
   const removeFromCart=async(req, res)=>{
    try {
      const { IdArt, IdCart} = req.params;

      const updatedCart = await Panier.findByIdAndUpdate(
        new mongoose.Types.ObjectId(IdCart),
        { $pull: { items: { item: new mongoose.Types.ObjectId(IdArt) } } },
        { new: true }
      );
      if (updatedCart.items.length === 0) {
        await Panier.findByIdAndDelete(IdCart);
        return res.status(200).json({ message: "✅ Article supprimé. La commande était vide et a été supprimée." });
    }
      if (!updatedCart) {
          return res.status(404).json({ message: "❌ Cart non trouvée" });
      }

      res.status(200).json({ message: "✅ Article supprimé de la Cart", updatedCart });
  } catch (error) {
      console.error("❌ Erreur lors de la suppression de l'article :", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
  }
   }




module.exports = {findCart, createCart, removeFromCart};
