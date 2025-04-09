const mongoose = require("mongoose");

const commandSchema = new mongoose.Schema({
    items: [
        {
            item: { 
                type: mongoose.Schema.Types.ObjectId, 
                required: true, 
                ref: "Item" // Référence dynamique en fonction du type de l'article
            },
           
            quantity: { 
                type: Number, 
                required: true, 
                min: 1 // La quantité doit être au moins 1
            },
            TotalPriceItem:{
                type: Number,
                
            } ,
         
        }
    ],
    user: { 
        type: String, 
        
    },
    status:{
        type:String
    },
    payment:{type:Boolean, default:false},
    TotalPrice: { 
        type: Number, 
        
    },
    deliveryDate: { 
        type: Date, 
        default: () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // Date de livraison par défaut (2 jours plus tard)
    }
});
commandSchema.pre("save", function(next) {
    this.TotalPrice = this.items.reduce((sum, item) => sum + item.TotalPriceItem, 0);
    next();
});

const Command = mongoose.model("Command", commandSchema);
module.exports = Command;
