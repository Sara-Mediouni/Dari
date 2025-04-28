const Panier = require("../model/Cart");
const mongoose = require('mongoose');
const Command = require("../model/Commande");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Item = require("../model/Item");
const admin = require('firebase-admin');

// Vérification d'un ObjectId valide
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  if (!orderId || typeof success === 'undefined') {
    return res.status(400).json({ success: false, message: "Données manquantes" });
  }

  if (!isValidObjectId(orderId)) {
    return res.status(400).json({ success: false, message: "ID de commande invalide" });
  }

  try {
    const order = await Command.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Commande non trouvée" });
    }

    if (success === "true") {
      await Command.findByIdAndUpdate(orderId, { payment: true });
      await Panier.findOneAndDelete({ user: order.user });
      res.json({ success: true, message: "Paiement réussi" });
    } else {
      await Command.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Paiement annulé, commande supprimée" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

const deleteItemFromOrder = async (req, res) => {
  const { orderId, itemId } = req.params;

  if (!isValidObjectId(orderId) || !isValidObjectId(itemId)) {
    return res.status(400).json({ message: "ID invalide" });
  }

  try {
    const updatedOrder = await Command.findByIdAndUpdate(
      orderId,
      { $pull: { items: { item: new mongoose.Types.ObjectId(itemId) } } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    if (updatedOrder.items.length === 0) {
      await Command.findByIdAndDelete(orderId);
      return res.status(200).json({ message: "✅ Article supprimé. Commande vide supprimée." });
    }

    res.status(200).json({ message: "✅ Article supprimé de la commande", updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const getCommandeWithItems = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "ID utilisateur invalide" });
  }

  try {
    const commandes = await Command.find({ user: id })
      .populate({
        path: 'items.item',
        populate: { path: 'image' }
      });

    return res.status(200).json(commandes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

const findOrderById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "ID invalide" });
  }

  try {
    const order = await Command.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const getFirebaseUserInfo = async (uid) => {
  try {
    const userRecord = await admin.auth().getUser(uid);
    return {
      email: userRecord.email,
      name: userRecord.displayName,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur Firebase", error);
    return null;
  }
};

const updatestatus = async (req, res) => {
  const { orderId, status } = req.body;

  if (!orderId || !status) {
    return res.status(400).json({ message: "Champs manquants" });
  }

  if (!isValidObjectId(orderId)) {
    return res.status(400).json({ message: "ID de commande invalide" });
  }

  try {
    const order = await Command.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ message: "Commande non trouvée" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const findAllOrders = async (req, res) => {
  try {
    const orders = await Command.find().populate('items.item');
    const commandesAvecUsers = await Promise.all(
      orders.map(async (commande) => {
        const userInfo = await getFirebaseUserInfo(commande.user);
        return {
          ...commande.toObject(),
          userInfo,
        };
      })
    );
    res.status(200).json(commandesAvecUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const checkout = async (req, res) => {
  const { userId, items } = req.body;

  if (!userId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: '❌ Mauvaise requête' });
  }

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: "ID utilisateur invalide" });
  }

  try {
    let totalPrice = 0;
    const populatedItems = [];

    for (const item of items) {
      const product = await Item.findById(item.productId);
      if (!product) {
        console.warn(`Produit non trouvé pour ID: ${item.productId}`);
        continue;
      }

      const totalItemPrice = product.price * item.quantity;

      populatedItems.push({
        item: product._id,
        quantity: item.quantity,
        TotalPriceItem: totalItemPrice,
      });

      totalPrice += totalItemPrice;
    }

    if (populatedItems.length === 0) {
      return res.status(400).json({ message: "Aucun produit valide trouvé" });
    }

    const newCommande = new Command({
      user: userId,
      items: populatedItems,
      TotalPrice: totalPrice,
      status: 'En attente',
    });

    await newCommande.save();

    const line_items = populatedItems.map((item) => {
      const unitPrice = (item.TotalPriceItem / item.quantity) * 100;
      return {
        price_data: {
          currency: "usd",
          product_data: { name: "Article" },
          unit_amount: Math.round(unitPrice),
        },
        quantity: item.quantity,
      };
    });

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Frais de livraison" },
        unit_amount: 200,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `http://localhost:5173/verify?success=true&orderId=${newCommande._id}`,
      cancel_url: `http://localhost:5173/verify?success=false&orderId=${newCommande._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Erreur pendant le checkout :", error);
    res.status(500).json({ message: "Erreur lors du checkout" });
  }
};

module.exports = {
  getCommandeWithItems,
  findAllOrders,
  updatestatus,
  findOrderById,
  checkout,
  deleteItemFromOrder,
  verifyOrder
};
