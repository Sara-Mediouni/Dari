
const mongoose=require('mongoose');


const UserSchema = new mongoose.Schema({
    name: String,
    commande:[{type:mongoose.Schema.Types.ObjectId, ref: "Command"}],
    email: { type: String, unique: true , required: true },
    uid: { type: String, unique: true , required: true },
  });
  const User = mongoose.model("User", UserSchema);
  module.exports = User;