const Panier = require("../model/Cart");
const mongoose=require ('mongoose')
const Command = require("../model/Commande");
const stripe = require("stripe")("sk_test_51RBMXo4FlSbelSuKp15qkCFl65CTopoEuNZcQ5pIjYp0rJjoHazQIQkaunaimiOvL6enfref6slxKJRmfvx11w1q003oe4GUPp");
const Pastry = require("../model/Item");
const User=require("../model/User");
const Item = require("../model/Item");
const admin = require('firebase-admin');

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      const order=await Command.findById(orderId);
      await Command.findByIdAndUpdate(orderId,{payment:true});
      res.json({success:true, message:"Paid"})
      await Panier.findOneAndDelete({ user: order.user });
      

    }
    else{
      await Command.findByIdAndDelete(orderId);
      res.json({success:false, message:"Not Paid"})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"});
  }
};





  const deleteItemFromOrder = async (req, res) => {
    try {
        const { orderId, itemId } = req.params;

        const updatedOrder = await Command.findByIdAndUpdate(
             orderId,
            { $pull: { items: { item: new mongoose.Types.ObjectId(itemId) } } },
            { new: true }
        );
        if (updatedOrder.items.length === 0) {
          await Command.findByIdAndDelete(orderId);
          return res.status(200).json({ message: "✅ Article supprimé. La commande était vide et a été supprimée." });
      }
        if (!updatedOrder) {
            return res.status(404).json({ message: "❌ Commande non trouvée" });
        }

        res.status(200).json({ message: "✅ Article supprimé de la commande", updatedOrder });
    } catch (error) {
        console.error("❌ Erreur lors de la suppression de l'article :", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};

const getCommandeWithItems = async (req, res) => {
    try {
        const id= req.params.id; // Récupération de l'ID depuis les paramètres de l'URL
        const commandes = await Command.find({ user: id })
            .populate({
                path: 'items.item',
                populate: { path: 'image' }
              });; // Populate les items pour chaque commande

        return res.status(200).json(commandes);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error getting orders");
    }
}; 

const findOrderById = async (req, res) => {
    try {
        const { id } = req.params; // Récupération de l'ID depuis les paramètres de l'URL
        
        // Vérification si l'ID est valide
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        // Recherche de la commande par ID
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


// Cette fonction prend un UID Firebase et te renvoie l'email, le nom, etc.
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

const updatestatus=async(req, res)=>{
   try
   {const orderId=req.body.orderId;
   const order=await Command.findByIdAndUpdate(orderId,{status:req.body.status})
   res.status(200).send(order)
  }
  catch(error){
    res.status(500).send("Error")
  }
}

const findAllOrders=async(req, res)=>{
  try{
      const orders=await Command.find().populate('items.item');
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
  }
  catch(error){
    res.status(500).json(error);
  }
}
// Finaliser la commande (vider le panier et créer une commande)

const checkout = async (req, res) => {
  const { userId, items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: '❌ Le panier est vide' });
  }

  try {
    let totalPrice = 0;

    const populatedItems = [];

    for (const item of items) {
      const product = await Item.findById(item.productId);
      if (!product) continue;

      const totalItemPrice = product.price * item.quantity;

      populatedItems.push({
        item: product._id,
        quantity: item.quantity,
        TotalPriceItem: totalItemPrice,
      });

      totalPrice += totalItemPrice;
    }

    const newCommande = new Command({
      user: userId,
      items: populatedItems,
      TotalPrice: totalPrice,
      status: 'En attente',
    });

    await newCommande.save();

    const line_items = populatedItems.map((item) => {
      const unitPrice = (item.TotalPriceItem / item.quantity) * 100; // en cents
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Article", // Tu peux améliorer en ajoutant `product.name`
          },
          unit_amount: Math.round(unitPrice),
        },
        quantity: item.quantity,
      };
    });

    // Frais de livraison (exemple fixe : 2$)
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Frais de livraison",
        },
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



  
  
module.exports= {getCommandeWithItems,findAllOrders,updatestatus,findOrderById,checkout,deleteItemFromOrder, verifyOrder}