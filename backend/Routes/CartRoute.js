const express=require('express');
const { findCart, createCart, removeFromCart } = require('../Controller/PanierController');
const router=express.Router();



router.get("/findcart/:userId", findCart);
router.post("/createcart", createCart);
router.post("/removecart/:IdArt/:IdCart", removeFromCart);




module.exports = router