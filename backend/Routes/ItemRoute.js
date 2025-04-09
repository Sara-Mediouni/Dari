const express = require('express');
const { getItem, setItem, getAllItems,findByCategory, deleteItemById } = require('../Controller/ItemController');
const router = express.Router();
const multer = require('multer');

// Configurer multer pour stocker les fichiers dans "assets"
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req, file, cb)=>{
   return cb(null,`${file.originalname}`)
    }
})
const upload = multer({ storage: storage });

router.get("/item/:id", getItem);
router.post("/additem", upload.single("image"), setItem);
router.get("/getallitems", getAllItems);
router.post("/deleteitem/:id", deleteItemById);
router.get("/getitembycategory", findByCategory);

module.exports = router;
