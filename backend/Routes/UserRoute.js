
const express = require('express');
const { SignUp, addOrderToUser} = require('../Controller/Usercontroller');
const router = express.Router();


router.post("/signup", SignUp);
router.post("/addorder/:uid/:id", addOrderToUser);

module.exports = router;