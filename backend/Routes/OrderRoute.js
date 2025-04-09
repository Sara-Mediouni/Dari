const express=require('express');
const { findOrderById,getCommandeWithItems,updatestatus,findAllOrders, checkout, deleteItemFromOrder, verifyOrder} = require('../Controller/CommandeController');
const router=express.Router();

router.get('/getorders/:id',getCommandeWithItems);
router.post('/updateorder/:orderId/:itemId',deleteItemFromOrder);
router.post('/verify',verifyOrder)
router.post('/checkout/:userId',checkout)
router.get('/getallorders',findAllOrders)
router.get('/getorders/:id',findOrderById)
router.post('/status',updatestatus)
module.exports = router