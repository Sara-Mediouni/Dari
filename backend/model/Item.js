const mongoose=require('mongoose');



const itemSchema= new mongoose.Schema({
item: { type: String, required: true, unique: true },
price: { type: Number, required: true},
image: {type: String, required: true},
category: {type:String,enum: ["Pastry", "Decoration", "Clothes"]}
});


const Item = mongoose.model("Item", itemSchema);
module.exports = Item;