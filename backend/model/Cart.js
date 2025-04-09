const mongoose = require("mongoose");

const PanierSchema = new mongoose.Schema({
  user: { type: String, required: true }, // Stocker l'UID Firebase en tant que chaîne
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Item",
      },

      quantity: { type: Number, default: 1 },

      TotalPriceItem: {
        type: Number,
      },
    },
  ],
  totalPrice: { type: Number, default: 0 }, // Prix total du panier
  createdAt: { type: Date, default: Date.now },
});

const Panier = mongoose.model("Panier", PanierSchema);
module.exports = Panier;
