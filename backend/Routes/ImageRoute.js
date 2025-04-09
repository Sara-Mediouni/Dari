const express=require('express');
const { setImage, getImage } = require('../Controller/ImageController');
const router=express.Router();

const multer = require('multer');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "C:/Users/Dell/dari/backend/assets"); // Enregistre dans "assets"
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname); // Nom unique
    },
});
const upload = multer({ storage: storage });
router.get("/image/:id", getImage);
// Route pour afficher une image en fonction de son ID
router.post("/addimage",upload.single("image"), setImage);

module.exports = router